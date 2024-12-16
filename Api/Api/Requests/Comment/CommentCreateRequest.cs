using System.ComponentModel.DataAnnotations;

namespace Api.Requests.Comment
{
    public class CommentCreateRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public int RecipeId { get; set; }
    }
}
