using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Requests.UserRecipeFavorite;

namespace Api.Mapper
{
    public static class UserRecipeFavoriteMapper
    {
        public static UserRecipeFavorite? ToUserRecipeFavoriteFromAddRequest(this UserRecipeFavoriteRequest request)
        {
            return new UserRecipeFavorite
            {
                UserId = request.UserId,
                RecipeId = request.RecipeId
            };
        }

        public static UserRecipeFavoriteDto? ToUserRecipeFavoriteDtoFromToUserRecipeFavorite(this UserRecipeFavorite userRecipeFavoriteDto)
        {
            return new UserRecipeFavoriteDto
            {
                UserId = userRecipeFavoriteDto.UserId,
                RecipeId = userRecipeFavoriteDto.RecipeId
            };
        }
    }
}
