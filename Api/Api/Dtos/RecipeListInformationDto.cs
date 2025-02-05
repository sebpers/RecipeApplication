using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class RecipeListInformationDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Author { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        public string? Image { get; set; }
        public UserRecipeFavoriteDto? FavoritedBy { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
