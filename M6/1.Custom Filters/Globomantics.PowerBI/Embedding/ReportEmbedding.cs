using Globomantics.PowerBI.Interfaces;
using Globomantics.PowerBI.Models;
using Microsoft.Extensions.Options;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Globomantics.PowerBI.Embedding
{
    public class ReportEmbedding : IReportEmbedding
    {
        private readonly WorkspaceConfiguration _workspaceConfiguration;
        private readonly IIdentityProvider _identityProvider;

        public ReportEmbedding(
            IOptions<WorkspaceConfiguration> workspaceConfiguration,
            IIdentityProvider identityProvider)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
            _identityProvider = identityProvider;
        }

        public async Task<EmbedModel> GetEmbeddingDetailsForReport(string reportName, string azureADToken)
        {
            var tokenCredential = new TokenCredentials(azureADToken);
            using (var pbiClient = new PowerBIClient(tokenCredential))
            {
                var reports = await pbiClient.Reports.GetReportsAsync(_workspaceConfiguration.WorkspaceId);
                var report = reports.Value.First(x => 
                        string.Equals(x.Name, reportName, System.StringComparison.OrdinalIgnoreCase));

                var dataset =
                    await pbiClient.Datasets.GetDatasetInGroupAsync(_workspaceConfiguration.WorkspaceId,
                            report.DatasetId);

                var parameters = BuildTokenRequestParameters(dataset);

                var reportToken = 
                    pbiClient.Reports.GenerateTokenInGroup(_workspaceConfiguration.WorkspaceId, 
                            report.Id, parameters);

                return new EmbedModel
                {
                    Id = report.Id,
                    EmbedUrl = report.EmbedUrl,
                    AccessToken = reportToken.Token
                };
            }
        }

        private GenerateTokenRequest BuildTokenRequestParameters(Dataset dataset)
        {
            var parameters = new GenerateTokenRequest(
                accessLevel: "View",
                datasetId: dataset.Id
            );

            if (dataset.IsEffectiveIdentityRequired.HasValue && dataset.IsEffectiveIdentityRequired.Value)
            {
                var userIdentity = _identityProvider.GetUserIdentityWithDatasetId(dataset.Id);
                parameters.Identities = new List<EffectiveIdentity>
                {
                    userIdentity
                };
            }

            return parameters;
        }
    }
}
