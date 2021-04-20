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
    public class DashboardEmbedding : IDashboardEmbedding
    {
        private readonly WorkspaceConfiguration _workspaceConfiguration;
        private readonly IIdentityProvider _identityProvider;

        public DashboardEmbedding(
            IOptions<WorkspaceConfiguration> workspaceConfiguration,
            IIdentityProvider identityProvider)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
            _identityProvider = identityProvider;
        }

        public async Task<EmbedModel> GetEmbeddingDetailsForDashboard(string dashboardName, 
            string azureADToken)
        {
            var tokenCredential = new TokenCredentials(azureADToken);
            using (var pbiClient = new PowerBIClient(tokenCredential))
            {
                var dashboards = 
                    await pbiClient.Dashboards.GetDashboardsInGroupAsync(_workspaceConfiguration.WorkspaceId);

                var dashboard = dashboards.Value.First(x => 
                        string.Equals(x.DisplayName, dashboardName, System.StringComparison.OrdinalIgnoreCase));

                var datasets = 
                    await pbiClient.Datasets.GetDatasetsInGroupAsync(_workspaceConfiguration.WorkspaceId);

                var parameters = BuildTokenRequestParameters(datasets.Value);

                var dashboardToken = 
                    pbiClient.Dashboards.GenerateTokenInGroup(_workspaceConfiguration.WorkspaceId,
                            dashboard.Id, parameters);

                return new EmbedModel
                {
                    Id = dashboard.Id,
                    EmbedUrl = dashboard.EmbedUrl,
                    AccessToken = dashboardToken.Token
                };
            }
        }

        private GenerateTokenRequest BuildTokenRequestParameters(IList<Dataset> datasets)
        {
            var parameters = new GenerateTokenRequest( accessLevel: "View" );

            var rlsEnabledDatasets = 
                datasets.Where(x => x.IsEffectiveIdentityRequired.HasValue && 
                                x.IsEffectiveIdentityRequired.Value)
                                .Select(x => x.Id);

            if (rlsEnabledDatasets.Any())
            {
                var userIdentity = _identityProvider.GetUserIdentity();

                userIdentity.Datasets = rlsEnabledDatasets.ToList();
                parameters.Identities = new List<EffectiveIdentity>
                {
                    userIdentity
                };
            }

            return parameters;
        }
    }
}
