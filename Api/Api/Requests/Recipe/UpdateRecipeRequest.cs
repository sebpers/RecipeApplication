using System.ComponentModel.DataAnnotations;

namespace Api.Requests.Recipe
{
    public class UpdateRecipeRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public List<string> Ingredients { get; set; } = new List<string>();
        [Required]
        public List<string> Instructions { get; set; } = new List<string>();
    }
}
