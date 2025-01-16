using Api.Dtos;
using Api.Entities;
using Api.Requests.UserRecipeFavorite;
using Microsoft.EntityFrameworkCore;

namespace Api.Interfaces.Service
{
    public interface IUserRecipeFavoriteService
    {
        Task<bool> AddAsync(string userId, int recipeId);
        Task<List<RecipeListInformationDto?>> GetAllUserFavoritesAsync(string userId);
        Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId);
    }
}
