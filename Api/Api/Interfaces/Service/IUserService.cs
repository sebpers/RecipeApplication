using Api.Dtos;
using Api.Dtos.Pagination;
using Api.Dtos.Statistic;
using Api.Entities;
using Api.Requests.Query;

namespace Api.Interfaces.Service
{
    public interface IUserService
    {
        Task<UserDto?> UpdateUserDescriptionAsync(string description, string userId);
        Task<User?> GetByIdAsync(string id);
        Task<UserWithRolesDto> GetUserWithRolesAsync(string id);
        Task<bool> IsSameUser(string userId, string token);
        bool IsLoggedInUserAdmin(string token);
        Task<bool> IsAdminOrAuthor(string userId);
        Task<PaginatedResponseDto<QueryUserWithRolesDto>> GetQueriedUsersAsync(QueryParamRequest queryParams);
        Task<UserStatisticResponseDto> GetUserStatistics();
    }
}