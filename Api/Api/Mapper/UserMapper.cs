using Api.Dtos;
using Api.Entities;

namespace Api.Mapper
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                Id = userModel.Id,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Description = userModel.Description,
                CreatedAt = userModel.CreatedAt,
                Recipes = userModel?.Recipes?.Select(r => r.ToRecipeDto()).ToList(),
                FavoriteRecipes = userModel?.FavoriteRecipes
            };
        }

        public static UserVisitedDto ToUserVisitedDto(this User userModel, string loggedInUserId)
        {
            var isFavored = userModel.FavoritedBy?.Any(f => f.UserId == loggedInUserId) ?? false;

            return new UserVisitedDto
            {
                Id = userModel.Id,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Description = userModel.Description,
                CreatedAt = userModel.CreatedAt,
                Recipes = userModel?.Recipes?.Select(r => r.ToRecipeDto()).ToList(),
                FavoriteRecipes = userModel?.FavoriteRecipes,
                IsFavorited = isFavored
            };
        }

        public static UserWithRolesDto ToUserWithRolesDto(this User userModel, IList<string?> roles)
        {
            return new UserWithRolesDto
            {
                Id = userModel.Id,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Description = userModel.Description,
                CreatedAt = userModel.CreatedAt,
                Recipes = userModel?.Recipes?.Select(r => r.ToRecipeDto()).ToList(),
                FavoriteRecipes = userModel?.FavoriteRecipes,
                Roles = roles
            };
        }
    }
}
