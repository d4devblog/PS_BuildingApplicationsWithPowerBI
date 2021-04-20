using System;
using Globomantics.AuthFilter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Globomantics.Controllers
{
    /// <summary>
    /// Demo Authentication:
    /// 
    /// This Controller is a fake authentication endpoint that allows the application to hold onto
    /// a user account - by username only!
    /// It has been created so that this demo application has no database/3rd party auth dependencies.
    /// It should not be used as an example of how to add authentication to an application,
    /// and it should NEVER be used to protect a genuine application.
    /// </summary>
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            var currentUser = DemoAuthentication.GetCurrentUser(this.HttpContext);
            if (!string.IsNullOrWhiteSpace(currentUser))
            {
                return RedirectToAction("index", "app", null);
            }

            return View();
        }

        [HttpPost]
        public IActionResult Login(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return View();
            }

            var cookieOptions = new CookieOptions()
            {
                Expires = DateTime.Now.AddDays(7),
                Secure = true,
                HttpOnly = false,
                SameSite = SameSiteMode.Strict
            };

            var encodedUser = Base64UrlEncoder.Encode(username.Trim());
            HttpContext.Response.Cookies.Append(DemoAuthentication.DemoAuthCookieName, encodedUser, cookieOptions);

            return new RedirectToActionResult("index", "app", null);
        }

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete(DemoAuthentication.DemoAuthCookieName);
            return new RedirectToActionResult("index", "app", null);
        }
    }
}
