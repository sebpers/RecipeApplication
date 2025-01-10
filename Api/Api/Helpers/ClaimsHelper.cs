using Api.Interfaces.Helpers;
using Api.Jwt;
using System.Security.Claims;

namespace Api.Helpers
{
    public class ClaimsHelper : IClaimsHelper
    {
        private readonly JwtHandler _jwtHandler;

        public ClaimsHelper(JwtHandler jwtHandler)
        {
            _jwtHandler = jwtHandler;
        }

        // Check if the user has an "Admin" role
        //public bool IsAdmin(ClaimsPrincipal user)
        //{
        //    return user.IsInRole("Admin");
        //}

        // Check if the user is the author (based on the userId)
        //public bool IsAuthor(ClaimsPrincipal user, string authorId)
        //{
        //    var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return userIdClaim == authorId;
        //}

        // Check if the user has a specific role
        //public bool HasRole(ClaimsPrincipal user, string role)
        //{
        //    return user.IsInRole(role);
        //}

        public string? GetLoggedInUserId(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Token is missing");
            }

            var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);

            if (claimsPrincipal == null)
            {
                throw new UnauthorizedAccessException("Invalid or expired token");
            }

            return claimsPrincipal.FindFirst("id")?.Value;
        }

        public bool IsLoggedInUserAdmin(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Token is missing");
            }

            var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);

            if (claimsPrincipal == null)
            {
                throw new UnauthorizedAccessException("Invalid or expired token");
            }

            var roles = claimsPrincipal.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();

            return roles.Contains("Admin");
        }
    }
}
