using Globomantics.PowerBI.Models;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IDashboardEmbedding
    {
        Task<EmbedModel> GetEmbeddingDetailsForDashboard(string dashboardName, string azureADToken);
    }
}
