using Globomantics.PowerBI.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Authentication
{
    public class AzureTokenGenerator : IAzureTokenGenerator
    {
        private readonly AzureADConfiguration _adConfiguration;
        private readonly IMemoryCache _memoryCache;
        public AzureTokenGenerator(IOptions<AzureADConfiguration> adConfiguration, IMemoryCache memoryCache)
        {
            _adConfiguration = adConfiguration.Value;
            _memoryCache = memoryCache;
        }

        public async Task<string> GetAuthToken()
        {
            var authenticationContext = new AuthenticationContext(_adConfiguration.AuthorityUri);
            var credential = new ClientCredential(_adConfiguration.ClientId, _adConfiguration.ClientSecret);

            var authenticationResult = 
                await authenticationContext.AcquireTokenAsync(_adConfiguration.ResourceUri, credential);

            return authenticationResult.AccessToken;
        }

        public async Task<string> GetAndCacheAuthToken()
        {
            return await _memoryCache.GetOrCreateAsync<string>(nameof(AzureTokenGenerator), async (c) =>
            {
                c.AbsoluteExpirationRelativeToNow = new System.TimeSpan(0, 55, 0);
                return await GetAuthToken();
            });
        }
    }
}
