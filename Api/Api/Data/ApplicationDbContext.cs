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
        }

        public DbSet<Recipe>? Recipes { get; set; }  
        public DbSet<Comment>? Comments { get; set; }
        public DbSet<UserRecipeFavorite>? UserRecipeFavorites { get; set; }
    }
}
