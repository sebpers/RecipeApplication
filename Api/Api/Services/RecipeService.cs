using Api.Dtos;
using Api.Dtos.Pagination;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces.Helpers;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Requests.Query;
using Api.Requests.Recipe;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using System.Security.Claims;

namespace Api.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepo;
        private readonly UserManager<User> _userManager;
        private readonly IImageProcessorHelper _imageProcessor;

        public RecipeService(IRecipeRepository recipeRepository, UserManager<User> userManager, IImageProcessorHelper imageProcessor)
        {
            _recipeRepo = recipeRepository;
            _userManager = userManager;
            _imageProcessor = imageProcessor;
        }

        public async Task<List<RecipeDto>> GetAllAsync()
        {
            List<Recipe> recipes = await _recipeRepo.GetAllAsync();
            List<RecipeDto> recipeDtos = recipes.Select(r => r.ToRecipeDto()).ToList();

            return recipeDtos;
        }

        public async Task<List<RecipeListInformationDto?>> GetRecipeListInformation(string loggedInUserId)
        {
            List<Recipe> recipes = await _recipeRepo.GetAllAsync();
            List<RecipeListInformationDto?> recipeListInformationDtos = recipes
                .Select(r => loggedInUserId != null
                    ? r.ToRecipeListInformationDto(loggedInUserId)
                    : r.ToRecipeListInformationDto())
                .ToList();

            return recipeListInformationDtos;
        }

        public async Task<PaginatedResponseDto<RecipeListInformationDto>> GetRecipeListInformationByPagination(string loggedInUserId, QueryParamRequest queryParams)
        {
            var query = _recipeRepo.GetAllAsQuery();

            if (!string.IsNullOrEmpty(queryParams.Search))
            {
                query = query.Where(r => r.Author.Contains(queryParams.Search) || r.Title.Contains(queryParams.Search));
            }

            var totalRecords = await query.CountAsync();

            var recipes = await query
                .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
                .Take(queryParams.PageSize)
                .ToListAsync();

            List<RecipeListInformationDto?> recipeListInformationDtos = recipes
                .Select(r => loggedInUserId != null
                    ? r.ToRecipeListInformationDto(loggedInUserId)
                    : r.ToRecipeListInformationDto())
                .ToList();

            return new PaginatedResponseDto<RecipeListInformationDto>
            {
                Items = recipeListInformationDtos,
                TotalCount = totalRecords
            };
        }

        public async Task<RecipeDto?> GetByIdAsync(int id, string userId)
        {
            Recipe recipeModel = await _recipeRepo.GetByIdAsync(id);

            if (recipeModel == null)
            {
                return null;
            }
            // Pass in userId to get favorite recipe if logged in
            return recipeModel.ToRecipeDto(userId);
        }

        public async Task<List<RecipeDto?>?> GetRecipesByUserId(string userId)
        {
            User userModel = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (userModel == null)
            {
                return null;
            }

            bool NotValidRole = !await _userManager.IsInRoleAsync(userModel, "Admin") && !await _userManager.IsInRoleAsync(userModel, "Author");

            if (NotValidRole)
            {
                throw new UnauthorizedAccessException("You do not have permission to fetch these recipes.");
            }

            List<Recipe> recipeModel = await _recipeRepo.GetRecipesByUserId(userId);

            if (recipeModel == null || !recipeModel.Any())
            {
                return null;
            }

            List<RecipeDto?>? recipeDtos = recipeModel.Select(r => r.ToRecipeDto(userId)).ToList();

            return recipeDtos;
        }

        public async Task<RecipeDto?> UpdateAsync(UpdateRecipeRequest request, int id)
        {
            Recipe recipeModel = await _recipeRepo.GetByIdAsync(id);

            if (recipeModel == null)
            {
                return null;
            }

            recipeModel.Title = request.Title;
            recipeModel.Description = request.Description;
            recipeModel.Ingredients = request.Ingredients;
            recipeModel.Instructions = request.Instructions;
            recipeModel.UpdatedAt = DateTime.Now;

            Recipe updatedRecipe = await _recipeRepo.UpdateAsync(recipeModel);

            return updatedRecipe.ToRecipeDto();
        }

        public async Task<RecipeDto> CreateAsync(CreateRecipeRequest request, IFormFile? image)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if (user == null)
                throw new Exception("User not found");

            var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
            var isAuthor = await _userManager.IsInRoleAsync(user, "Author");

            if (!isAdmin && !isAuthor)
                throw new UnauthorizedAccessException("Only users with the 'admin' or 'Author' role can create recipes.");

            Recipe recipeModel = request.ToRecipeFromCreateRequest();

            if (image != null)
            {
                recipeModel.Image = await _imageProcessor.ProcessImageAsync(image);
            }

            recipeModel.Author = $"{user.FirstName} {user.LastName}";

            recipeModel.Title = string.IsNullOrEmpty(recipeModel.Title)
                ? recipeModel.Title
                : Transform.FirstCharToUpper(recipeModel.Title);

            recipeModel.Description = string.IsNullOrEmpty(recipeModel.Description)
                ? recipeModel.Description
                : Transform.FirstCharToUpper(recipeModel.Description);

            recipeModel.Ingredients = recipeModel.Ingredients
            .Select(ingredient => ingredient != null ? Transform.FirstCharToUpper(ingredient) : "")
            .ToList();

            recipeModel.Instructions = recipeModel.Instructions
                .Select(instruction => instruction != null ? Transform.FirstCharToUpper(instruction) : "")
                .ToList();

            Recipe recipe = await _recipeRepo.CreateAsync(recipeModel);

            return recipe.ToRecipeDto();
        }

        public async Task<RecipeDto?> DeleteAsync(int id, ClaimsPrincipal currentUser)
        {
            Recipe recipeToDelete = await _recipeRepo.GetByIdAsync(id);

            if (recipeToDelete == null)
            {
                return null;
            }

            var userId = currentUser.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoles = currentUser.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();

            // Authorization logic - check if user is admin or the author of the recipe
            if (!userRoles.Contains("Admin") && recipeToDelete.UserId != userId)
            {
                throw new UnauthorizedAccessException("You do not have permission to delete this recipe.");
            }

            Recipe? deletedRecipe = await _recipeRepo.DeleteAsync(recipeToDelete);

            return deletedRecipe.ToRecipeDto();
        }
    }
}
