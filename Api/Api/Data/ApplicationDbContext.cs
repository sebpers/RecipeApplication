using Api.Entities;
using Api.SeedConfiguration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, string>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new RoleConfiguration());
            //builder.ApplyConfiguration(new UserRoleConfiguration());

            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Favorite recipes
            builder.Entity<UserRecipeFavorite>()
                .HasKey(urf => new { urf.UserId, urf.RecipeId }); // Composite key

            builder.Entity<UserRecipeFavorite>()
                .HasOne(urf => urf.User)
                .WithMany(u => u.FavoriteRecipes)
                .HasForeignKey(urf => urf.UserId);

            builder.Entity<UserRecipeFavorite>()
                .HasOne(urf => urf.Recipe)
                .WithMany(r => r.FavoritedBy)
                .HasForeignKey(urf => urf.RecipeId);

            // Connection for user to add authors as favorites
            builder.Entity<UserAuthorFavorite>()
                .HasKey(ua => ua.Id);

            builder.Entity<UserAuthorFavorite>()
                .HasIndex(ua => new { ua.UserId, ua.AuthorId })
                .IsUnique(true);

            builder.Entity<UserAuthorFavorite>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.FavoriteAuthors)
                .HasForeignKey(ua => ua.UserId);

            builder.Entity<UserAuthorFavorite>()
                .HasOne(ua => ua.Author)
                .WithMany(u => u.FavoritedBy)
                .HasForeignKey(ua => ua.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Recipe>? Recipes { get; set; }  
        public DbSet<Comment>? Comments { get; set; }
        public DbSet<UserRecipeFavorite>? UserRecipeFavorites { get; set; }
        public DbSet<UserAuthorFavorite>? UserAuthorFavorites { get; set; }
    }
}
