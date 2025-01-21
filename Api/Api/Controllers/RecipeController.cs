using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Interfaces.Helpers;
using Api.Interfaces.Service;
using Api.Jwt;
using Api.Requests.Recipe;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly JwtHandler _jwtHandler;
        private readonly IUserService _userService;
        private readonly IClaimsHelper _claimsHelper;

        public RecipeController(
            IRecipeService recipeService,
            JwtHandler jwtHandler,
            IUserService userService,
            IClaimsHelper claimsHelper
        )
        {
            _recipeService = recipeService;
            _jwtHandler = jwtHandler;
            _userService = userService;
            _claimsHelper = claimsHelper;
        }

        private async Task<IActionResult> IsAuthorizedAsAdminOrAuthor()
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            string userId = _claimsHelper.GetLoggedInUserId(token);

            bool isAdminOrAuthor = await _userService.IsAdminOrAuthor(userId);

            if (!isAdminOrAuthor)
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<RecipeDto> recipeDtos = await _recipeService.GetAllAsync();

            return Ok(recipeDtos);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            string? loggedInUserId = null;
            var token = Request.Cookies["authToken"];

                if (token != null)
            {
                var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);

                if (claimsPrincipal != null)
                {
                    loggedInUserId = claimsPrincipal.FindFirst("id")?.Value;
                }
            }

            // Favorite recipes are only working for logged in users, show if logged in (recipeDto)
            string? userId = loggedInUserId ?? null;

            RecipeDto? recipeDto = await _recipeService.GetByIdAsync(id, userId);

            if (recipeDto == null)
            {
                return NotFound();
            }

            return Ok(recipeDto);
        }

        [Route("my-recipes/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetRecipesByUserId([FromRoute] string userId)
        {
            string token = Request.Cookies["authToken"];
            string? loggedInUserId = _claimsHelper.GetLoggedInUserId(token);

            if (loggedInUserId != userId)
            {
                return Unauthorized("Not authorized");
            }

            bool isAdminOrAuthor = await _userService.IsAdminOrAuthor(userId);

            if (!isAdminOrAuthor)
            {
                return Unauthorized("Not authorized");
            }

            List<RecipeDto?>? recipeDtos = await _recipeService.GetRecipesByUserId(userId);

            if (recipeDtos == null || recipeDtos.Count == 0)
            {
                return Ok(new List<RecipeDto?>());
            }

            return Ok(recipeDtos);
        }

        [Route("list-information")]
        [HttpGet]
        public async Task<IActionResult> GetRecipeListInformation()
        {
            try
            {
                string token = Request.Cookies["authToken"];
                string? loggedInUserId = null;

                if (token != null)
                {
                    loggedInUserId = _claimsHelper.GetLoggedInUserId(token);
                }

                List<RecipeListInformationDto?> RecipeListInformationDtos = loggedInUserId != null ?
                    await _recipeService.GetRecipeListInformation(loggedInUserId) // logged in users
                    :
                    await _recipeService.GetRecipeListInformation(); // logged out users


                if (RecipeListInformationDtos == null)
                {
                    return null;
                }

                return Ok(RecipeListInformationDtos);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateRecipeRequest request, [FromRoute] int id)
        {
            try
            {
                var authResult = await IsAuthorizedAsAdminOrAuthor();

                if (authResult is UnauthorizedResult || authResult is BadRequestObjectResult)
                {
                    return authResult;
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                RecipeDto? recipeDto = await _recipeService.UpdateAsync(request, id);

                if (recipeDto == null)
                {
                    return NotFound();
                }

                return Ok(recipeDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRecipeRequest request)
        {
            try
            {
                var authResult = await IsAuthorizedAsAdminOrAuthor();

                if (authResult is UnauthorizedResult || authResult is BadRequestObjectResult)
                {
                    return authResult;
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                RecipeDto recipeDto = await _recipeService.CreateAsync(request);

                return Ok(recipeDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var token = Request.Cookies["authToken"];

                var authResult = await IsAuthorizedAsAdminOrAuthor();

                if (authResult is UnauthorizedResult || authResult is BadRequestObjectResult)
                {
                    return authResult;
                }

                var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);
                if (claimsPrincipal == null)
                {
                    return Unauthorized(new { message = "Invalid or expired token" });
                }

                RecipeDto? recipeDto = await _recipeService.DeleteAsync(id, claimsPrincipal);

                if (recipeDto == null)
                {
                    return NotFound();
                }

                return Ok(new { deleted = true, message = "Item deleted successfully" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
