using Globomantics.PowerBI.Models;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IReportEmbedding
    {
        Task<EmbedModel> GetEmbeddingDetailsForReport(string reportName, string azureADToken);
    }
}
