using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/favorite-recipes")]
    [ApiController]
    public class UserRecipeFavoriteController : ControllerBase
    {
        private readonly IUserRecipeFavoriteService _userRecipeFavoriteService;

        public UserRecipeFavoriteController(IUserRecipeFavoriteService userRecipeFavoriteService)
        {
            _userRecipeFavoriteService = userRecipeFavoriteService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllUserFavoritesAsync([FromRoute] string userId)
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            List<RecipeListInformationDto?> recipeFavorites = await _userRecipeFavoriteService.GetAllUserFavoritesAsync(userId);

            return Ok(recipeFavorites);
        }

        [HttpGet]
        [Route("get-one")]
        public async Task<IActionResult> GetByIdAsync(string userId, int recipeId)
        {
            UserRecipeFavorite? recipeFavoriteDto = await _userRecipeFavoriteService.GetByIdsAsync(userId, recipeId);

            return Ok(recipeFavoriteDto);
        }

        [HttpPost("{recipeId}")]
        public async Task<IActionResult> AddAsync([FromRoute] int recipeId, [FromBody] string userId)
        {
            bool success = await _userRecipeFavoriteService.AddAsync(userId, recipeId);

            return Ok(success);
        }
    }
}
