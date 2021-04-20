using Globomantics.PowerBI.Interfaces;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Flurl.Http;
using Flurl;
using Globomantics.PowerBI.Models;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace Globomantics.PowerBI.Embedding
{
    public class TileRedirection: ITileRedirection
    {
        private string _powerBiApiEndpoint = "https://api.powerbi.com"; 
        private readonly WorkspaceConfiguration _workspaceConfiguration;
        private readonly IMemoryCache _memoryCache;

        public TileRedirection(
            IOptions<WorkspaceConfiguration> workspaceConfiguration,
            IMemoryCache memoryCache)
        {
            _workspaceConfiguration = workspaceConfiguration.Value;
            _memoryCache = memoryCache;
        }

        public async Task<string> GetTileTargetUrl(string dashboardId, 
            string tileId, string azureADToken)
        {
            string cacheKey = $"{nameof(TileRedirection)}|{dashboardId}|{tileId}";

            var tileRedirectionDetails = 
                await _memoryCache.GetOrCreateAsync<TileRedirectionModel>(cacheKey, async (c) =>
                {
                    c.AbsoluteExpirationRelativeToNow = new System.TimeSpan(0, 30, 0);
                    return await GetTileDetailsFromApi(dashboardId, tileId, azureADToken);
                });

            var targetUrl = tileRedirectionDetails?.Action?.OpenUrl?.TargetUrl;
            if (!string.IsNullOrEmpty(targetUrl))
            {
                var uri = new Uri(targetUrl);
                return uri.PathAndQuery;
            }

            return string.Empty;
        }

        private async Task<TileRedirectionModel> GetTileDetailsFromApi(string dashboardId, 
            string tileId, string azureADToken)
        {
            return await _powerBiApiEndpoint
                .AppendPathSegment("v1.0")
                .AppendPathSegment("myorg")
                .AppendPathSegment("groups")
                .AppendPathSegment(_workspaceConfiguration.WorkspaceId)
                .AppendPathSegment("dashboards")
                .AppendPathSegment(dashboardId)
                .AppendPathSegment("tiles")
                .AppendPathSegment(tileId)
                .WithOAuthBearerToken(azureADToken)
                .GetJsonAsync<TileRedirectionModel>();
        }
    }
}
