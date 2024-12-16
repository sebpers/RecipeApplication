namespace Api.Entities
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Instructions { get; set; } = new List<string>(); 
        public List<string> Ingredients { get; set; } = new List<string>(); 
        public string Author { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public string? UserId { get; set; }
        public User? User { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<UserRecipeFavorite> FavoritedBy { get; set; } = new List<UserRecipeFavorite>();
    }
}
