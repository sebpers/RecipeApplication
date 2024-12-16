using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class CommentDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public int RecipeId { get; set; }
    }
}
