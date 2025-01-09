using Api.Entities;
using Api.Interfaces.Service;
using Api.Requests.UserRecipeFavorite;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/favorites")]
    [ApiController]
    public class UserRecipeFavoriteController : ControllerBase
    {
        private readonly IUserRecipeFavoriteService _userRecipeFavoriteService;

        public UserRecipeFavoriteController(IUserRecipeFavoriteService userRecipeFavoriteService)
        {
            _userRecipeFavoriteService = userRecipeFavoriteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(string userId)
        {
            List<UserRecipeFavorite>? recipeFavoriteDtos = await _userRecipeFavoriteService.GetAllAsync(userId);

            return Ok(recipeFavoriteDtos);
        }

        [HttpGet]
        [Route("get-one")]
        public async Task<IActionResult> GetByIdAsync(string userId, int recipeId)
        {
            UserRecipeFavorite? recipeFavoriteDto = await _userRecipeFavoriteService.GetByIdsAsync(userId, recipeId);

            return Ok(recipeFavoriteDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(UserRecipeFavoriteRequest UserRecipeFavoriteRequest)
        {
            bool success = await _userRecipeFavoriteService.AddAsync(UserRecipeFavoriteRequest);

            return Ok(success);
        }
    }
}
