using System.ComponentModel.DataAnnotations;

namespace Api.Requests.UserRecipeFavorite
{
    public class UserRecipeFavoriteRequest
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public int RecipeId { get; set; }
    }
}
