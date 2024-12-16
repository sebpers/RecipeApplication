using Api.Entities;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Repository;
using Api.Requests.UserRecipeFavorite;

namespace Api.Services
{
    public class UserRecipeFavoriteService : IUserRecipeFavoriteService
    {
        private readonly IUserRecipeFavoriteRepository _userRecipeFavoriteRepository;

        public UserRecipeFavoriteService(IUserRecipeFavoriteRepository userRecipeFavoriteRepository)
        {
            _userRecipeFavoriteRepository = userRecipeFavoriteRepository;
        }

        public async Task<bool> AddAsync(UserRecipeFavoriteRequest userRecipeFavoriteRequest)
        {
            if (await ExistsAsync(userRecipeFavoriteRequest.UserId, userRecipeFavoriteRequest.RecipeId))
            {
                return false;
            }

            UserRecipeFavorite favoriteRecipeModel = userRecipeFavoriteRequest.ToUserRecipeFavoriteFromAddRequest();

            _userRecipeFavoriteRepository.AddAsync(favoriteRecipeModel);

            return true;
        }

        public async Task<List<UserRecipeFavorite>?> GetAllAsync(string userId)
        {
            // TODO -  Map to DTOS
            List<UserRecipeFavorite>? favoriteRecipeDtos = await _userRecipeFavoriteRepository.GetAllAsync(userId);

            return favoriteRecipeDtos;
        }

        public async Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId)
        {
            // TODO -  Map to DTO
            UserRecipeFavorite? favoriteRecipe = await _userRecipeFavoriteRepository.GetByIdsAsync(userId, recipeId);

            if (favoriteRecipe == null)
            {
                return null;
            }

            return favoriteRecipe;
        }

        private async Task<bool> ExistsAsync(string userId, int recipeId)
        {
            var favorite = await GetByIdsAsync(userId, recipeId);
            return favorite != null;
        }
    }
}
