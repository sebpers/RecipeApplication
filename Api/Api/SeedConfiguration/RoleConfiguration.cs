using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.SeedConfiguration
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(
                new Role
                {
                    Id = "7645dsa-12345r-123ewqds-123weqds-12ewd-3r4f",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    Description = "The admin role for the user"
                },
                new Role
                {
                     Id = "7645dsa-12345r-123ewqds-123weqds-12ewd-32f",
                     Name = "Author",
                     NormalizedName = "AUTHOR",
                     Description = "The author role for the user"
                },
                new Role
                {
                    Id = "7645dsa-12345r-ddd689hj-123weqds-12ewd-434oiuh",
                    Name = "Visitor",
                    NormalizedName = "VISITOR",
                    Description = "The visitor role for the user"
                }
            );
            
        }
    }
}
