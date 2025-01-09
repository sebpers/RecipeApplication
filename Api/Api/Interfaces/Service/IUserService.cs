using Api.Dtos;
using Api.Entities;

namespace Api.Interfaces.Service
{
    public interface IUserService
    {
        Task<UserDto?> UpdateUserDescriptionAsync(string description, string userId);
        Task<User?> GetByIdAsync(string id);
        Task<UserWithRolesDto> GetUserWithRolesAsync(string id);
        Task<bool> IsSameUser(string userId, string token);
        bool IsLoggedInUserAdmin(string token);
    }
}
