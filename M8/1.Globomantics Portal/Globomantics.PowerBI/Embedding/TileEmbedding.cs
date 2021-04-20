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
    public class TileEmbedding : ITileEmbedding
    {
        private readonly WorkspaceConfiguration _workspaceConfiguration;
        private readonly IIdentityProvider _identityProvider;

        public TileEmbedding(
            IOptions<WorkspaceConfiguration> workspaceConfiguration,
            IIdentityProvider identityProvider)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
            _identityProvider = identityProvider;
        }

        public async Task<TileEmbedModel> GetEmbeddingDetailsForTile(string dashboardName,
            string tileName, string azureADToken)
        {
            var tokenCredential = new TokenCredentials(azureADToken);
            using (var pbiClient = new PowerBIClient(tokenCredential))
            {
                var dashboards = 
                    await pbiClient.Dashboards.GetDashboardsAsync(_workspaceConfiguration.WorkspaceId);

                var dashboard = dashboards.Value.First(x => 
                        string.Equals(x.DisplayName, dashboardName, System.StringComparison.OrdinalIgnoreCase));

                var tiles = 
                    await pbiClient.Dashboards.GetTilesInGroupAsync(_workspaceConfiguration.WorkspaceId,
                            dashboard.Id);

                var tile = tiles.Value.First(x =>
                        string.Equals(x.Title, tileName, System.StringComparison.OrdinalIgnoreCase));

                var dataset =
                    await pbiClient.Datasets.GetDatasetInGroupAsync(_workspaceConfiguration.WorkspaceId,
                            tile.DatasetId);

                var parameters = BuildTokenRequestParameters(dataset);

                var tileToken = 
                    pbiClient.Tiles.GenerateTokenInGroup(_workspaceConfiguration.WorkspaceId, 
                            dashboard.Id, tile.Id, parameters);

                return new TileEmbedModel
                {
                    Id = tile.Id,
                    DashboardId = dashboard.Id,
                    EmbedUrl = tile.EmbedUrl,
                    AccessToken = tileToken.Token
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
