using Api.Entities;
using Api.Requests.UserRecipeFavorite;
using Microsoft.EntityFrameworkCore;

namespace Api.Interfaces.Service
{
    public interface IUserRecipeFavoriteService
    {
        Task<bool> AddAsync(UserRecipeFavoriteRequest userRecipeFavoriteRequest);
        Task<List<UserRecipeFavorite>?> GetAllAsync(string userId);
        Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId);
    }
}
