using System.ComponentModel.DataAnnotations;
using Api.Entities;

namespace Api.Dtos.Recipe
{
    public class RecipeDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public List<string> Ingredients { get; set; } = new List<string>();
        [Required]
        public List<string> Instructions { get; set; } = new List<string>();
        [Required]
        public string Author { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        public UserRecipeFavorite? FavoritedBy { get; set; }
        public string? Image { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int CommentId { get; set; }
        public List<CommentDto>? Comments { get; set; }
    }
}
