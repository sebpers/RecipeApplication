using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface IUserRecipeFavoriteRepository
    {
        Task AddAsync(UserRecipeFavorite UserRecipeFavoriteRequest);
        Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId);
        Task<List<UserRecipeFavorite>?> GetAllAsync(string userId);
        Task RemoveFavoredRecipe(UserRecipeFavorite UserRecipeFavoriteModel);    }
}
