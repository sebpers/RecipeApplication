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
        Task<List<RecipeListInformationDto>> GetRecipeListInformation();
        Task<RecipeDto?> GetByIdAsync(int id);
        Task<RecipeDto?> UpdateAsync(UpdateRecipeRequest request, int id);
        Task<RecipeDto> CreateAsync(CreateRecipeRequest request);
        Task<RecipeDto?> DeleteAsync(int id, ClaimsPrincipal currentUser);
    }
}
