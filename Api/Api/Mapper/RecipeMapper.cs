using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Requests.Recipe;

namespace Api.Mapper
{
    public static class RecipeMapper
    {
        public static RecipeDto ToRecipeDto(this Recipe recipeModel, string? loggedInUserId = null)
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
                Image = ConvertImageToBase64String(recipeModel.Image),
                Comments = recipeModel?.Comments.Select(c => c.ToCommentDto()).ToList(),
                FavoritedBy = recipeModel.FavoritedBy.FirstOrDefault(fb => loggedInUserId != null && fb.UserId == loggedInUserId)
            };
        }

        // Used when creating recipe
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
                Image = ConvertImageToBase64String(recipeModel.Image),
                Comments = recipeModel?.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static RecipeListInformationDto ToRecipeListInformationDtoFromUserRecipeFavorite(this UserRecipeFavorite userRecipeFavorite)
        {
            return new RecipeListInformationDto
            {
                Id = userRecipeFavorite.RecipeId,
                UserId = userRecipeFavorite.UserId,
                Title = userRecipeFavorite.Recipe.Title,
                Description = userRecipeFavorite.Recipe.Description,
                Author = userRecipeFavorite.Recipe.Author,
                CreatedAt = userRecipeFavorite.Recipe.CreatedAt,
                Image = ConvertImageToBase64String(userRecipeFavorite.Recipe.Image),
                FavoritedBy = userRecipeFavorite.ToUserRecipeFavoriteDtoFromToUserRecipeFavorite()
            };
        }

        // For logged in users
        public static RecipeListInformationDto? ToRecipeListInformationDto(this Recipe recipeModel, string loggedInUser)
        {
            return new RecipeListInformationDto
            {
                Id = recipeModel.Id,
                Title = recipeModel.Title,
                Author = recipeModel.Author,
                UserId = recipeModel.UserId,
                Image = ConvertImageToBase64String(recipeModel.Image),
                CreatedAt = recipeModel.CreatedAt,
                UpdatedAt = recipeModel.UpdatedAt,
                FavoritedBy = recipeModel.FavoritedBy?.FirstOrDefault(fb => fb.UserId == loggedInUser && fb.RecipeId == recipeModel.Id)
                    ?.ToUserRecipeFavoriteDtoFromToUserRecipeFavorite()
            };
        }

        // For people who are not logged in - skip favoredBy
        public static RecipeListInformationDto? ToRecipeListInformationDto(this Recipe recipeModel)
        {
            return new RecipeListInformationDto
            {
                Id = recipeModel.Id,
                Title = recipeModel.Title,
                Author = recipeModel.Author,
                UserId = recipeModel.UserId,
                Image = ConvertImageToBase64String(recipeModel.Image),
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

        private static string? ConvertImageToBase64String(Byte[]? image)
        {
            return image != null ? Convert.ToBase64String(image) : string.Empty;
        }
    }
}
