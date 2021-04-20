using Globomantics.PowerBI.Interfaces;
using Globomantics.PowerBI.Models;
using Microsoft.Extensions.Options;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using System.Linq;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Embedding
{
    public class ReportEmbedding : IReportEmbedding
    {
        private readonly WorkspaceConfiguration _workspaceConfiguration;

        public ReportEmbedding(IOptions<WorkspaceConfiguration> workspaceConfiguration)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
        }

        public async Task<ReportEmbedModel> GetEmbeddingDetailsForReport(string reportName, string azureADToken)
        {
            var tokenCredential = new TokenCredentials(azureADToken);
            using (var pbiClient = new PowerBIClient(tokenCredential))
            {
                var reports = await pbiClient.Reports.GetReportsAsync(_workspaceConfiguration.WorkspaceId);
                var report = reports.Value.First(x => 
                        string.Equals(x.Name, reportName, System.StringComparison.OrdinalIgnoreCase));

                var parameters = new GenerateTokenRequest(
                    accessLevel: "View",
                    datasetId: report.DatasetId
                );

                var reportToken = 
                    pbiClient.Reports.GenerateTokenInGroup(_workspaceConfiguration.WorkspaceId, 
                            report.Id, parameters);

                return new ReportEmbedModel
                {
                    Id = report.Id,
                    EmbedUrl = report.EmbedUrl,
                    AccessToken = reportToken.Token
                };
            }
        }
    }
}
