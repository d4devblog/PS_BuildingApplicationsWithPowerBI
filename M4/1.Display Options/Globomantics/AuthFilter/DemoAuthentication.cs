using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;

namespace Globomantics.AuthFilter
{
    public class DemoAuthentication : ActionFilterAttribute
    {
        public const string DemoAuthCookieName = "demoAuth";

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var authCookie = filterContext.HttpContext.Request.Cookies[DemoAuthCookieName];
            if (string.IsNullOrWhiteSpace(authCookie))
            {
                filterContext.Result = new RedirectToActionResult("login", "auth", null);
            }
        }
        public static string GetCurrentUser(HttpContext httpContext)
        {
            var cookieValue = httpContext.Request.Cookies[DemoAuthCookieName];
            if (!string.IsNullOrWhiteSpace(cookieValue))
            {
                return Base64UrlEncoder.Decode(cookieValue);
            }

            return null;
        }
    }
}
