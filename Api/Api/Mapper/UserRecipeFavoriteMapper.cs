using Api.Dtos.Recipe;
using Api.Entities;
using Api.Requests.UserRecipeFavorite;

namespace Api.Mapper
{
    public static class UserRecipeFavoriteMapper
    {
        public static UserRecipeFavorite ToUserRecipeFavoriteFromAddRequest(this UserRecipeFavoriteRequest request)
        {
            return new UserRecipeFavorite
            {
                UserId = request.UserId,
                RecipeId = request.RecipeId
            };
        }
    }
}
