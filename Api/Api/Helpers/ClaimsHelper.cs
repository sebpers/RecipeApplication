using Api.Interfaces.Helpers;
using System.Security.Claims;

namespace Api.Helpers
{
    public class ClaimsHelper : IClaimsHelper
    {
        // Check if the user has an "Admin" role
        public bool IsAdmin(ClaimsPrincipal user)
        {
            return user.IsInRole("Admin");
        }

        // Check if the user is the author (based on the userId)
        public bool IsAuthor(ClaimsPrincipal user, string authorId)
        {
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
            return userIdClaim == authorId;
        }

        // Check if the user has a specific role
        public bool HasRole(ClaimsPrincipal user, string role)
        {
            return user.IsInRole(role);
        }
    }
}
