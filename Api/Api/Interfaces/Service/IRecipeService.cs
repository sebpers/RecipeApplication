using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Requests.Recipe;
using System.Security.Claims;

namespace Api.Interfaces.Service
{
    public interface IRecipeService
    {
        Task<List<RecipeDto>> GetAllAsync();
        // For people who are logged in
        Task<List<RecipeListInformationDto?>> GetRecipeListInformation(string loggedInUserId);
        // For people who are not logged in
        Task<List<RecipeListInformationDto?>> GetRecipeListInformation();
        Task<RecipeDto?> GetByIdAsync(int id, string userId);
        Task<List<RecipeDto?>?> GetRecipesByUserId(string id);
        Task<RecipeDto?> UpdateAsync(UpdateRecipeRequest request, int id);
        Task<RecipeDto> CreateAsync(CreateRecipeRequest request);
        Task<RecipeDto?> DeleteAsync(int id, ClaimsPrincipal currentUser);
    }
}
