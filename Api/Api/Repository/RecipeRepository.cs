using Api.Data;
using Api.Entities;
using Api.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _context;

        public RecipeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> GetAllAsync()
        {
            return await _context.Recipes
                .Include(recipe => recipe.Comments)
                .Include(recipe => recipe.User)
                .ToListAsync();
        }

        public async Task<Recipe> GetByIdAsync(int id)
        {
            return await _context.Recipes
                .Include(r => r.User)
                .FirstAsync(recipe => recipe.Id == id);
        }

        public async Task<Recipe?> UpdateAsync(Recipe recipeModel)
        {
            await _context.SaveChangesAsync();

            Recipe? updatedRecipe = await _context.Recipes
                .FirstOrDefaultAsync(r => r.Id == recipeModel.Id);
                

            return updatedRecipe;
        }

        public async Task<Recipe> CreateAsync(Recipe recipe)
        {
            await _context.Recipes.AddAsync(recipe);

            await _context.SaveChangesAsync();

            var createdRecipe = await _context.Recipes
                                      .Include(r => r.User)  // Include the User related to this recipe
                                      .FirstOrDefaultAsync(r => r.Id == recipe.Id); // Get the just created recipe by its ID

            return createdRecipe;
        }


        public async Task<Recipe> DeleteAsync(Recipe recipeModel)
        {
            _context.Recipes.Remove(recipeModel);
            await _context.SaveChangesAsync();

            return recipeModel;
        }
    }
}
