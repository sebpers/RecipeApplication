using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface IRecipeRepository
    {
        Task<List<Recipe>> GetAllAsync();
        Task<Recipe> GetByIdAsync(int id);
        Task<Recipe> CreateAsync(Recipe recipe);
        Task<Recipe?> UpdateAsync(Recipe recipeModel);
        Task<Recipe> DeleteAsync(Recipe recipeToDelete);
    }
}
