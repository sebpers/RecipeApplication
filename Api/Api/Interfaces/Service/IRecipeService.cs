using Api.Dtos;
using Api.Dtos.Pagination;
using Api.Dtos.Recipe;
using Api.Requests.Query;
using Api.Requests.Recipe;
using System.Security.Claims;

namespace Api.Interfaces.Service
{
    public interface IRecipeService
    {
        Task<List<RecipeDto>> GetAllAsync();
        Task<RecipeDto?> GetByIdAsync(int id, string userId);
        Task<List<RecipeDto?>?> GetRecipesByUserId(string id);
        Task<RecipeDto?> UpdateAsync(UpdateRecipeRequest request, int id);
        Task<RecipeDto> CreateAsync(CreateRecipeRequest request);
        Task<RecipeDto?> DeleteAsync(int id, ClaimsPrincipal currentUser);
        Task<PaginatedResponseDto<RecipeListInformationDto>> GetRecipeListInformationByPagination(string loggedInUserId, QueryParamRequest queryParams);
    }
}
