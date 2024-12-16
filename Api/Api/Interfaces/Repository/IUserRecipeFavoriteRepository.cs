using Api.Entities;
using Api.Mapper;

namespace Api.Interfaces.Repository
{
    public interface IUserRecipeFavoriteRepository
    {
        void AddAsync(UserRecipeFavorite UserRecipeFavoriteRequest);
        Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId);
        Task<List<UserRecipeFavorite>?> GetAllAsync(string userId);
    }
}
