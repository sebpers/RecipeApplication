using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface IRecipeRepository
    {
        Task<List<Recipe>> GetAllAsync();
        IQueryable<Recipe> GetAllAsQuery();
        Task<Recipe> GetByIdAsync(int id);
        Task<List<Recipe>> GetRecipesByUserId(string userId);
        Task<Recipe> CreateAsync(Recipe recipe);
        Task<Recipe?> UpdateAsync(Recipe recipeModel);
        Task<Recipe> DeleteAsync(Recipe recipeToDelete);
    }
}
