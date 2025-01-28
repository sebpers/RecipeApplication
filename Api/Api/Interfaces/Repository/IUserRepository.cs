using Api.Dtos;
using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface IUserRepository
    {
        Task UpdateUserDescriptionAsync(User? userModel);
        Task<User?> GetByIdAsync(string id);
        Task<IList<string>?> GetRolesByUserAsync(User userModel);
        Task<(List<QueryUserWithRolesDto>, int)> GetQueriedUsersAsync(string sortBy, string sortOrder, int pageNumber, int pageSize, string search);
        Task<List<UserWithRolesDto>> GetUsersWithRolesAsync();
    }
}
