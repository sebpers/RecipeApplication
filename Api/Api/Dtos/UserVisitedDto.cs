using Api.Dtos.Recipe;
using Api.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class UserVisitedDto
    {
        [Required]
        public string Id { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [MaxLength(500, ErrorMessage = "Name cannot be greater than 500")]
        public string? Description { get; set; } = string.Empty;
        [Required]
        public DateTime CreatedAt { get; set; }
        public bool IsFavorited { get; set; }

        public List<RecipeDto>? Recipes { get; set; }
        public List<UserRecipeFavorite>? FavoriteRecipes { get; set; } = new List<UserRecipeFavorite>();
    }
}
