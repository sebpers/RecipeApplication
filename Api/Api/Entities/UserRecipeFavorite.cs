namespace Api.Entities
{
    public class UserRecipeFavorite
    {
        public string? UserId { get; set; } // Foreign key to User (string because User inherits from IdentityUser which id is a string
        public int RecipeId { get; set; }  // Foreign key to Recipe

        // Navigation properties
        public User? User { get; set; }
        public Recipe? Recipe { get; set; }
    }
}
