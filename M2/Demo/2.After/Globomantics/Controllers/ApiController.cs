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

        public ApiController(IAzureTokenGenerator tokenGenerator, IReportEmbedding reportEmbedding)
        {
            _tokenGenerator = tokenGenerator;
            _reportEmbedding = reportEmbedding;
        }

        [HttpPost]
        [Route("api/embedding/report")]
        public async Task<ActionResult<ReportEmbedModel>> GetReportEmbedModel(
            [FromBody]ReportRequest reportRequest)
        {
            var azureAdToken = await _tokenGenerator.GetAndCacheAuthToken();
            var reportEmbedModel = 
                await _reportEmbedding.GetEmbeddingDetailsForReport(reportRequest.ReportName, azureAdToken);

            return reportEmbedModel;
        }
    }
}
