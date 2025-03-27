using Api.Dtos.Recipe;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Api.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        [MaxLength(500, ErrorMessage = "Name cannot be greater than 500")]
        public string? Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public List<Recipe>? Recipes { get; set; } = new List<Recipe>();
        public List<UserRecipeFavorite>? FavoriteRecipes { get; set; } = new List<UserRecipeFavorite>();

        public List<UserAuthorFavorite>? FavoriteAuthors { get; set; } = new List<UserAuthorFavorite>();
        public List<UserAuthorFavorite>? FavoritedBy { get; set; } = new List<UserAuthorFavorite>();
    }
}
