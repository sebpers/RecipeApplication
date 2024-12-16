using System.ComponentModel.DataAnnotations;

namespace Api.Requests.Recipe
{
    public class CreateRecipeRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        [MinLength(1, ErrorMessage = "Ingredients cannot be empty.")]
        public List<string> Ingredients { get; set; } = new List<string>();
        [Required]
        [MinLength(1, ErrorMessage = "Instructions cannot be empty.")]
        public List<string> Instructions { get; set; } = new List<string>();
        [Required]
        public string? UserId { get; set; } = string.Empty;
    }
}
