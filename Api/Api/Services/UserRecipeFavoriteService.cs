using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Repository;

namespace Api.Services
{
    public class UserRecipeFavoriteService : IUserRecipeFavoriteService
    {
        private readonly IUserRecipeFavoriteRepository _userRecipeFavoriteRepository;
        private readonly IRecipeService _recipeService;

        public UserRecipeFavoriteService(IUserRecipeFavoriteRepository userRecipeFavoriteRepository, IRecipeService recipeService)
        {
            _userRecipeFavoriteRepository = userRecipeFavoriteRepository;
            _recipeService = recipeService;
        }

        public async Task<List<RecipeListInformationDto?>> GetAllUserFavoritesAsync(string userId)
        {
            List<UserRecipeFavorite?> favoriteRecipesList = await _userRecipeFavoriteRepository.GetAllAsync(userId);

            if (favoriteRecipesList == null)
            {
                return null;
            }

            List<RecipeListInformationDto> recipeListInformationDto = favoriteRecipesList
                .Select(fr => fr.ToRecipeListInformationDtoFromUserRecipeFavorite(userId))
                .ToList();

            return recipeListInformationDto;
        }

        public async Task<List<UserRecipeFavorite>?> GetAllUsersFavoriteAsync(string userId)
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

        public async Task<bool> AddAsync(string userId, int recipeId)
        {
            if (await ExistsAsync(userId, recipeId))
            {
                if(await RemoveAsync(userId, recipeId))
                {
                    return false;
                };
            }

            var favoriteRecipe = new UserRecipeFavorite
            {
                UserId = userId,
                RecipeId = recipeId
            };

            await _userRecipeFavoriteRepository.AddAsync(favoriteRecipe);

            return true;
        }

        public async Task<bool> RemoveAsync(string userId, int recipeId)
        {
            try
            {
                var existingFavoredRecipe = await GetByIdsAsync(userId, recipeId);

                await _userRecipeFavoriteRepository.RemoveFavoredRecipe(existingFavoredRecipe);

                return true;
            }
            catch (Exception e)
            {
                throw new Exception("ERROR: " + e.Message);
            }
        }

        private async Task<bool> ExistsAsync(string userId, int recipeId)
        {
            var favorite = await GetByIdsAsync(userId, recipeId);
            return favorite != null;
        }
    }
}
