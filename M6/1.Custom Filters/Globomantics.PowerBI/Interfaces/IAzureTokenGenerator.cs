using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IAzureTokenGenerator
    {
        Task<string> GetAuthToken();
        Task<string> GetAndCacheAuthToken();
    }
}
