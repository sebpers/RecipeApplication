using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Helpers;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Requests.Query;
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
        private readonly IClaimsHelper _claimsHelper;

        public UserController(UserManager<User> userManager, IUserService userService, IClaimsHelper claimsHelper)
        {
            _userManager = userManager;
            _userService = userService;
            _claimsHelper = claimsHelper;
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

                return Ok(new { user = userModel?.ToUserDto() });
        }

        [HttpGet("dashboard/users/statistics")]
        public async Task<IActionResult> GetUserStatistics()
        {
            var token = Request.Cookies["authToken"];

            if (token == null)
            {
                return Unauthorized(new { message = "Not authenticated" });
            }

            if (!_userService.IsLoggedInUserAdmin(token))
            {
                return Unauthorized(new { message = "Unauthorized" });
            }

            try
            {
                var result = await _userService.GetUserStatistics();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the error and return a server error response
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while retrieving users." });
            }
        }

        [HttpGet("dashboard/query-users")]
        public async Task<IActionResult> GetQueryUsersParam([FromQuery] QueryParamRequest queryParams)
        {
            var token = Request.Cookies["authToken"];

            if (token == null)
            {
                return Unauthorized(new { message = "Not authenticated" });
            }

            if (!_userService.IsLoggedInUserAdmin(token))
            {
                return Unauthorized(new { message = "Unauthorized" });
            }

            try
            {
                var result = await _userService.GetQueriedUsersAsync(queryParams);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the error and return a server error response
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while retrieving users." });
            }
        }

        [HttpPut("my/edit/description/{userId}")]
        public async Task<IActionResult> UpdateDescriptionAsync([FromBody] string description, [FromRoute] string userId)
        {
            try
            {
                var token = Request.Cookies["authToken"];

                if (token == null)
                {
                    return Unauthorized(new { message = "Not authenticated" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isSameUser = await _userService.IsSameUser(userId, token);

                if ((isSameUser && _claimsHelper.IsAdminOrAuthor(token)) || _userService.IsLoggedInUserAdmin(token))
                {
                    UserDto? user = await _userService.UpdateUserDescriptionAsync(description, userId);

                    if (user == null)
                    {
                        return NotFound("No user was found");
                    }

                    return Ok(new { user });
                }
                else
                {
                    return Unauthorized(new { message = "Not authorized" });
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e.Message);
            }
        }
    }
}
