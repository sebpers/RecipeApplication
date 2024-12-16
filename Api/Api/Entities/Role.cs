using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class Role : IdentityRole
    {
        public string? Description { get; set; }
    }
}
