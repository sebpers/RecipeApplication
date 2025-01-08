using Api.Data;
using Api.Dtos;
using Api.Entities;
using Api.Jwt;
using Api.Requests.Authentication;
using Api.Requests.Registration;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;
        private readonly ApplicationDbContext _context;

        public AccountsController(
            UserManager<User> userManager,
            IMapper mapper,
            JwtHandler jwtHandler,
            ApplicationDbContext context
           )
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _context = context;
        }



        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationRequest userForRegistration)
        {
            if (userForRegistration is null)
            {
                return BadRequest();
            }



            User userModel = _mapper.Map<User>(userForRegistration);
            var result = await _userManager.CreateAsync(userModel, userForRegistration.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(err => err.Description);

                return BadRequest(errors);
            }

            string[] validRoles = ["Visitor", "Author", "Admin"];
            // These are temporary - Remove all except "Visitor" when actively selection role when registrating
            if (validRoles.Contains(userForRegistration.Role) && userForRegistration.Role == "Admin")
            {
                await _userManager.AddToRoleAsync(userModel, userForRegistration.Role);
            }

            if (validRoles.Contains(userForRegistration.Role) && userForRegistration.Role == "Author")
            {
                await _userManager.AddToRoleAsync(userModel, userForRegistration.Role);
            }

            if (validRoles.Contains(userForRegistration.Role) && userForRegistration.Role == "Visitor")
            {
                await _userManager.AddToRoleAsync(userModel, "Visitor");
            }

            IList<string>? roles = await _userManager.GetRolesAsync(userModel);
            string? token = _jwtHandler.CreateToken(userModel, roles);

            // Return a 201 response with the token
            return StatusCode(201, new AuthResponseDto { IsAuthSuccessful = true, Roles = roles });
        }

        // Login
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationRequest userForAuthentication)
        {
            User? userModel = await _userManager.FindByNameAsync(userForAuthentication.Email!);

            if (userModel is null || !await _userManager.CheckPasswordAsync(userModel, userForAuthentication.Password!))
            {
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid credentials" });
            }

            // Fetch again to include recipes...
            User? user = await _userManager.Users
               .Include(u => u.Recipes)
               .FirstOrDefaultAsync(u => u.Email == userForAuthentication.Email);

            userModel.Recipes = user.Recipes;

            IList<string>? roles = await _userManager.GetRolesAsync(userModel);

            string? token = _jwtHandler.CreateToken(userModel, roles);

            // Set HttpOnly cookie
            Response.Cookies.Append("authToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Ensure cookies are sent only over HTTPS (currently http is okay for dev... - with false)
                SameSite = SameSiteMode.Strict, // Prevent CSRF
                Expires = DateTime.UtcNow.AddHours(1) // Set expiration
            });

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Roles = roles, User = userModel });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("authToken");
            return Ok(new { Message = "Logged out successfully" });
        }


        [HttpGet("me")]
        public IActionResult GetLoggedInUser()
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Token is missing" });
            }

            var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);

            if (claimsPrincipal == null)
            {
                return Unauthorized(new { message = "Invalid or expired token" });
            }

            // Get user details from ClaimsPrincipal
            var username = claimsPrincipal.Identity?.Name;
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var isAuthenticated = claimsPrincipal.Identity?.IsAuthenticated;
            var roles = claimsPrincipal.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();
            var id = claimsPrincipal.FindFirst("id")?.Value;
            var firstName = claimsPrincipal.FindFirst("firstName")?.Value;
            var lastName = claimsPrincipal.FindFirst("lastName")?.Value;
            var description = claimsPrincipal.FindFirst("description")?.Value;

            var user = new
            {
                Id = id,
                FirstName = firstName,
                LastName = lastName,
                Username = username,
                UserId = userId,
                Roles = roles,
                IsAuthenticated = isAuthenticated,
                Description = description
            };

            return Ok(user);
        }

        [HttpGet("validate")]
        public IActionResult ValidateToken()
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Token is missing" });
            }

            var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);
            if (claimsPrincipal == null)
            {
                return Unauthorized(new { message = "Invalid or expired token" });
            }

            return Ok(new { message = "Token is valid", user = claimsPrincipal.Identity?.Name });
        }
    }
}
