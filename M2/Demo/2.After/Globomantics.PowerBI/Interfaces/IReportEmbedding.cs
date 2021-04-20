using Globomantics.PowerBI.Models;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IReportEmbedding
    {
        Task<ReportEmbedModel> GetEmbeddingDetailsForReport(string reportName, string azureADToken);
    }
}
