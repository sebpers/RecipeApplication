namespace Api.Entities
{
    public class UserAuthorFavorite
    {
        // Is used as a primary key since both userId and authorId is of type string which is too long for the DB to handel
        public int Id { get; set; }

        public string UserId { get; set; }
        public User? User { get; set; }

        public string AuthorId { get; set; }
        public User? Author { get; set; }
    }
}
