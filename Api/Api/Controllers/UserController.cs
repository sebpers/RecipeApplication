using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Service;
using Api.Mapper;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserService _userService;

        public UserController(UserManager<User> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<User?> userModels = await _userManager.Users.ToListAsync();

            if (userModels.Count == 0)
            {
                return NotFound("No users was found");
            }

            return Ok(new { users = userModels });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(string id)
        {
            UserWithRolesDto? userModel = await _userService.GetUserWithRolesAsync(id);

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
            User? userModel = await _userManager.Users
                    .Include(u => u.Recipes)
                    .FirstOrDefaultAsync(u => u.Id == id);

            var token = Request.Cookies["authToken"];
            if (token != null)
            {
                // Validate the token and return user information
                // return user and roles from fetched user...

                return Ok(new { user = userModel?.ToUserDto() });
            }

            return Unauthorized(new { message = "Not authenticated" });
        }

        [Authorize(Roles = "Admin, Author")]
        [HttpPut("my/edit/description/{userId}")]
        public async Task<IActionResult> UpdateDescriptionAsync([FromBody] string description, [FromRoute] string userId)
        {
            var token = Request.Cookies["authToken"];

            if (token == null)
            {
                return Unauthorized(new { message = "Not authenticated" });
            }

            bool isSameUser = await _userService.IsSameUser(userId, token);

            if (!isSameUser && !_userService.IsLoggedInUserAdmin(token))
            {
                return Unauthorized(new { message = "Not authorized" });
            }

            UserDto? user = await _userService.UpdateUserDescriptionAsync(description, userId);

            if (user == null)
            {
                return NotFound("No user was found");
            }

            return Ok(new { user });
        }
    }
}
