using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface ITileRedirection
    {
        Task<string> GetTileTargetUrl(string dashboardId, string tileId, string azureADToken);
    }
}
