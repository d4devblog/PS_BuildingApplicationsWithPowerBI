using Globomantics.AuthFilter;
using Microsoft.AspNetCore.Mvc;

namespace Globomantics.Controllers
{
    public class AppController : Controller
    {
        [DemoAuthentication]
        [Route("/orders", Order = 4)]
        [Route("/purchasing", Order = 3)]
        [Route("/sales-reports", Order = 2)]
        [Route("/", Order = 1)]
        public ActionResult Index()
        {
            return View();
        }
    }
}
