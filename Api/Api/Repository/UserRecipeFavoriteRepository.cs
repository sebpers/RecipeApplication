using Api.Data;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Mapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class UserRecipeFavoriteRepository : IUserRecipeFavoriteRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRecipeFavoriteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserRecipeFavorite UserRecipeFavoriteModel)
        {
            await _context.UserRecipeFavorites.AddAsync(UserRecipeFavoriteModel);
            await _context.SaveChangesAsync();
        }

        public async Task<UserRecipeFavorite?> GetByIdsAsync(string userId, int recipeId)
        {
            UserRecipeFavorite? favoriteRecipeDto = await _context.UserRecipeFavorites.FirstOrDefaultAsync(urf => urf.UserId == userId && urf.RecipeId == recipeId);

            return favoriteRecipeDto;
        }

        public async Task<List<UserRecipeFavorite>?> GetAllAsync(string userId)
        {
            List<UserRecipeFavorite>? favoriteRecipeDtos = await _context.UserRecipeFavorites
                .Include(usr => usr.Recipe)
                .Where(usr => usr.UserId == userId)
                .Where(usr => usr.Recipe != null)
                .ToListAsync();

            return favoriteRecipeDtos;
        }
        public async Task RemoveFavoredRecipe(UserRecipeFavorite UserRecipeFavoriteModel)
        {
            _context.UserRecipeFavorites.Remove(UserRecipeFavoriteModel);
            await _context.SaveChangesAsync();
        }
    }
}
