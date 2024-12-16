using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetUsersAsync()
        //{
        //    // get user...
        //    User? userModel = await _userManager.a;

        //    var token = Request.Cookies["authToken"];
        //    if (token != null)
        //    {
        //        // Validate the token and return user information
        //        // return user and roles from fetched user...
        //        return Ok(new { user = userModel, roles = new[] { "admin" } }); // Remove roles?
        //    }

        //    return Unauthorized(new { message = "Not authenticated" });
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(string id)
        {
            // get user...
            User? userModel = await _userManager.FindByIdAsync(id);

            var token = Request.Cookies["authToken"];
            if (token != null)
            {
                // Validate the token and return user information
                // return user and roles from fetched user...
                // Should return a DTO - fix mapper
                return Ok(new { user = userModel });
            }

            return Unauthorized(new { message = "Not authenticated" });
        }
        [HttpGet("visit/{id}")]
        public async Task<IActionResult> GetVisitedUserAsync(string id)
        {
            // get user...
            User? userModel = await _userManager.Users
                    .Include(u => u.Recipes)
                    .FirstOrDefaultAsync(u => u.Id == id);

            var token = Request.Cookies["authToken"];
            if (token != null)
            {
                // Validate the token and return user information
                // return user and roles from fetched user...

                // Should return a DTO - fix mapper
                return Ok(new { user = userModel });
            }

            return Unauthorized(new { message = "Not authenticated" });
        }
    }
}
