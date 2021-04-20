using Globomantics.PowerBI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.PowerBI.Api.Models;
using System.Collections.Generic;

namespace Globomantics.PowerBI.RowLevelSecurity
{
    public class IdentityProvider: IIdentityProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IdentityProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public EffectiveIdentity GetUserIdentity()
        {
            var user = GetCurrentUserName();
            return new EffectiveIdentity
            {
                Username = user,
                Roles = new List<string> { "GlobomanticsUser" }
            };
        }

        public EffectiveIdentity GetUserIdentityWithDatasetId(string datasetId)
        {
            var user = GetCurrentUserName();
            return new EffectiveIdentity
            {
                Username = user,
                Roles = new List<string> { "GlobomanticsUser" },
                Datasets = new List<string> { datasetId }
            };
        }

        // Utility function to get the current 'user' from our simple authentication setup
        // This would normally be provided by HttpContext.User.Identity (or similar)
        private string GetCurrentUserName()
        {
            var auth = _httpContextAccessor.HttpContext.Request.Cookies["demoAuth"];
            return Base64UrlEncoder.Decode(auth);
        }
    }
}
