using Globomantics.Controllers.ApiModels;
using Globomantics.PowerBI.Interfaces;
using Globomantics.PowerBI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Globomantics.Controllers
{
    public class ApiController : Controller
    {
        private readonly IAzureTokenGenerator _tokenGenerator;
        private readonly IReportEmbedding _reportEmbedding;
        private readonly IDashboardEmbedding _dashboardEmbedding;
        private readonly ITileEmbedding _tileEmbedding;
        private readonly ITileRedirection _tileRedirection;
        public ApiController(IAzureTokenGenerator tokenGenerator, 
            IReportEmbedding reportEmbedding,
            IDashboardEmbedding dashboardEmbedding,
            ITileEmbedding tileEmbedding,
            ITileRedirection tileRedirection)
        {
            _tokenGenerator = tokenGenerator;
            _reportEmbedding = reportEmbedding;
            _dashboardEmbedding = dashboardEmbedding;
            _tileEmbedding = tileEmbedding;
            _tileRedirection = tileRedirection;
        }

        [HttpPost]
        [Route("api/embedding/report")]
        public async Task<ActionResult<EmbedModel>> GetReportEmbedModel(
            [FromBody]ReportRequest reportRequest)
        {
            var azureAdToken = await _tokenGenerator.GetAndCacheAuthToken();
            var embedModel = 
                await _reportEmbedding.GetEmbeddingDetailsForReport(reportRequest.ReportName, azureAdToken);

            return embedModel;
        }

        [HttpPost]
        [Route("api/embedding/dashboard")]
        public async Task<ActionResult<EmbedModel>> GetDashboardEmbedModel(
            [FromBody]DashboardRequest dashboardRequest)
        {
            var azureAdToken = await _tokenGenerator.GetAndCacheAuthToken();

            var embedModel =
                await _dashboardEmbedding.GetEmbeddingDetailsForDashboard(dashboardRequest.DashboardName, 
                    azureAdToken);

            return embedModel;
        }

        [HttpPost]
        [Route("api/embedding/tile")]
        public async Task<ActionResult<TileEmbedModel>> GetTileEmbedModel(
            [FromBody]TileRequest tileRequest)
        {
            var azureAdToken = await _tokenGenerator.GetAndCacheAuthToken();

            var embedModel =
                await _tileEmbedding.GetEmbeddingDetailsForTile(tileRequest.DashboardName,
                        tileRequest.TileName, azureAdToken);

            return embedModel;
        }

        [HttpPost]
        [Route("api/embedding/tile/redirection")]
        public async Task<ActionResult<string>> GetTileRedirectionTarget(
            [FromBody]TileRedirectionRequest redirectionRequest)
        {
            var azureAdToken = await _tokenGenerator.GetAndCacheAuthToken();

            var redirectionUrl =
                await _tileRedirection.GetTileTargetUrl(
                    redirectionRequest.DashboardId,
                    redirectionRequest.TileId, 
                    azureAdToken);

            return redirectionUrl;
        }
    }
}
