using Globomantics.PowerBI.Models;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface ITileEmbedding
    {
        Task<TileEmbedModel> GetEmbeddingDetailsForTile(string dashboardName,
            string tileName, string azureADToken);
    }
}
