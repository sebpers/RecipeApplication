using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Requests.Recipe;

namespace Api.Mapper
{
    public static class RecipeMapper
    {
        public static RecipeDto ToRecipeDto(this Recipe recipeModel)
        {
            return new RecipeDto
            {
                Id = recipeModel.Id,
                Title = recipeModel.Title,
                Description = recipeModel.Description,
                Ingredients = recipeModel.Ingredients,
                Instructions = recipeModel.Instructions,
                Author = recipeModel.Author,
                CreatedAt = recipeModel.CreatedAt,
                UpdatedAt = recipeModel.UpdatedAt,
                UserId = recipeModel.UserId,
                Comments = recipeModel.Comments.Select(c => c.ToCommentDto()).ToList(),
            };
        }

        public static RecipeListInformationDto ToRecipeListInformationDto(this Recipe recipeModel)
        {
            return new RecipeListInformationDto
            {
                Id = recipeModel.Id,
                Title = recipeModel.Title,
                Author = recipeModel.Author,
                UserId = recipeModel.UserId,
                CreatedAt = recipeModel.CreatedAt,
                UpdatedAt = recipeModel.UpdatedAt
            };
        }

        public static Recipe ToRecipeFromCreateRequest(this CreateRecipeRequest recipeRequest)
        {
            return new Recipe
            {
                Title = recipeRequest.Title,
                Description = recipeRequest.Description,
                Ingredients = recipeRequest.Ingredients,
                Instructions = recipeRequest.Instructions,
                UserId = recipeRequest.UserId
            };
        }

        public static Recipe ToRecipeFromUpdateRequest(this UpdateRecipeRequest recipeRequest)
        {
            return new Recipe
            {
                Title = recipeRequest.Title,
                Description = recipeRequest.Description,
                Ingredients = recipeRequest.Ingredients,
                Instructions = recipeRequest.Instructions
            };
        }
    }
}
