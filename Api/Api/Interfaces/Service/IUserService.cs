using Api.Entities;

namespace Api.Interfaces.Service
{
    public interface IUserService
    {
        Task<User?> UpdateUserDescriptionAsync(string description, string userId);
        Task<User?> GetByIdAsync(string id);
        Task<bool> IsSameUser(string userId, string token);
        bool IsLoggedInUserAdmin(string token);
    }
}
