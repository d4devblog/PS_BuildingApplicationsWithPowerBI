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
    public class TileEmbedding : ITileEmbedding
    {
        private readonly WorkspaceConfiguration _workspaceConfiguration;

        public TileEmbedding(
            IOptions<WorkspaceConfiguration> workspaceConfiguration)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
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

                var parameters = new GenerateTokenRequest(accessLevel: "View", datasetId: tile.DatasetId);

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
    }
}
