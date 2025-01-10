using System.Security.Claims;

namespace Api.Interfaces.Helpers
{
    public interface IClaimsHelper
    {
        //bool IsAdmin(ClaimsPrincipal user);
        //bool IsAuthor(ClaimsPrincipal user, string authorId);
        //bool HasRole(ClaimsPrincipal user, string role);
        string? GetLoggedInUserId(string token);
        bool IsLoggedInUserAdmin(string token);
    }
}
