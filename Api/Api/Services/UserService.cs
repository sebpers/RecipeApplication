using Api.Dtos;
using Api.Dtos.Pagination;
using Api.Dtos.Recipe;
using Api.Dtos.Statistic;
using Api.Entities;
using Api.Interfaces.Helpers;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Requests.Query;
using Microsoft.AspNetCore.Identity;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IClaimsHelper _claimsHelper;
        private readonly UserManager<User> _userManager;

        public UserService(IUserRepository userRepository, IClaimsHelper claimsHelper, UserManager<User> userManager)
        {
            _userRepository = userRepository;
            _claimsHelper = claimsHelper;
            _userManager = userManager;
        }

        public async Task<UserDto?> UpdateUserDescriptionAsync(string description, string id)
        {
            User? userModel = await GetByIdAsync(id);

            if (userModel == null)
            {
                return null;
            }

            userModel.Description = description;

            await _userRepository.UpdateUserDescriptionAsync(userModel);

            return userModel.ToUserDto();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            User? userModel = await _userRepository.GetByIdAsync(id);

            return userModel;
        }

        public async Task<UserWithRolesDto> GetUserWithRolesAsync(string id)
        {
            User? userModel = await _userRepository.GetByIdAsync(id);

            if (userModel == null)
            {
                throw new Exception($"User do not exist with id: {userModel.Id}");
            }

            IList<string?> roles = await _userRepository.GetRolesByUserAsync(userModel);

            UserWithRolesDto userWithRoles = userModel.ToUserWithRolesDto(roles);

            return userWithRoles;
        }

        public async Task<PaginatedResponseDto<QueryUserWithRolesDto>> GetQueriedUsersAsync(UserQueryParamRequest queryParams)
        {
            var (users, totalCount) = await _userRepository.GetQueriedUsersAsync(
            queryParams.SortBy,
            queryParams.SortOrder,
            queryParams.PageNumber,
            queryParams.PageSize,
            queryParams.Search);

            return new PaginatedResponseDto<QueryUserWithRolesDto>
            {
                TotalCount = totalCount,
                Items = users
            };
        }

        public async Task<UserStatisticResponseDto> GetUserStatistics()
        {
            TimeZoneInfo swedenTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Stockholm");

            // Get the current date and time in Sweden
            DateTime currentDate = GetCurrentDateInSweden(swedenTimeZone);

            // Get the last year date
            DateTime lastYearDate = currentDate.AddYears(-1);

            // Calculate relevant date ranges
            var dateRanges = GetDateRanges(currentDate, lastYearDate);

            // Fetch users
            List<UserWithRolesDto> users = await _userRepository.GetUsersWithRolesAsync();

            if (!users.Any()) return null;

            // Get the earliest user creation date
            DateTime firstCreatedUserDate = GetUsersStartDate(users);

            // Calculate role and recipe distribution
            var roleDistribution = GetRoleDistribution(users);
            var recipeDistribution = GetRecipeDistribution(users);

            // Calculate user creation time spans
            var userCreationTimeSpan = GetUserCreationTimeSpan(users, dateRanges, firstCreatedUserDate);

            return new UserStatisticResponseDto
            {
                RoleDistribution = roleDistribution,
                RecipeDistribution = recipeDistribution,
                UserCreationTimeSpan = userCreationTimeSpan
            };
        }

        private DateTime GetCurrentDateInSweden(TimeZoneInfo swedenTimeZone)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, swedenTimeZone).Date;
        }

        private (DateTime yesterdayStart, DateTime weekStart, DateTime yearStart, DateTime lastYearStart, DateTime lastYearEnd, DateTime lastWeekStart, DateTime lastWeekEnd)
            GetDateRanges(DateTime currentDate, DateTime lastYearDate)
        {
            DateTime yesterdayStart = currentDate.AddDays(-1);
            DateTime weekStart = currentDate.AddDays(-(int)currentDate.DayOfWeek + 1);
            DateTime yearStart = new DateTime(currentDate.Year, 1, 1);
            DateTime lastYearStart = new DateTime(lastYearDate.Year, 1, 1);
            DateTime lastYearEnd = new DateTime(lastYearDate.Year, 12, 31, 23, 59, 59, 999);

            DateTime lastWeekStart = weekStart.AddDays(-7);
            DateTime lastWeekEnd = lastWeekStart.AddDays(6).AddTicks(-1);

            return (yesterdayStart, weekStart, yearStart, lastYearStart, lastYearEnd, lastWeekStart, lastWeekEnd);
        }

        private DateTime GetUsersStartDate(List<UserWithRolesDto> users)
        {
            return users.Min(user => user.CreatedAt);
        }

        private List<PieChartDataDto> GetRoleDistribution(List<UserWithRolesDto> users)
        {
            return users
                .SelectMany(user => user.Roles)
                .GroupBy(role => role)
                .Select(group => new PieChartDataDto
                {
                    Name = group.Key,
                    Value = group.Count()
                })
                .ToList();
        }

        private List<PieChartDataDto> GetRecipeDistribution(List<UserWithRolesDto> users)
        {
            return users
                .SelectMany(user => user.Recipes ?? new List<RecipeDto>())
                .GroupBy(recipe => recipe.Title)
                .Select(group => new PieChartDataDto
                {
                    Name = group.Key,
                    Value = group.Count()
                })
                .ToList();
        }

        private List<PieChartDataDto> GetUserCreationTimeSpan(List<UserWithRolesDto> users,
            (DateTime yesterdayStart, DateTime weekStart, DateTime yearStart, DateTime lastYearStart, DateTime lastYearEnd, DateTime lastWeekStart, DateTime lastWeekEnd) dateRanges, DateTime firstCreatedUserDate)
        {
            int usersToday = users.Count(user => user.CreatedAt >= dateRanges.weekStart);
            int usersYesterday = users.Count(user => user.CreatedAt >= dateRanges.yesterdayStart && user.CreatedAt < dateRanges.weekStart);
            int usersThisWeek = users.Count(user => user.CreatedAt >= dateRanges.weekStart && user.CreatedAt < dateRanges.weekStart.AddDays(7));
            int usersLastWeek = users.Count(user => user.CreatedAt >= dateRanges.lastWeekStart && user.CreatedAt <= dateRanges.lastWeekEnd);
            int usersThisYear = users.Count(user => user.CreatedAt >= dateRanges.yearStart && user.CreatedAt < dateRanges.weekStart.AddDays(1));
            int usersLastYear = users.Count(user => user.CreatedAt >= dateRanges.lastYearStart && user.CreatedAt <= dateRanges.lastYearEnd);
            int usersSinceAppStart = users.Count(user => user.CreatedAt >= firstCreatedUserDate);

            return new List<PieChartDataDto>
                {
                    new PieChartDataDto { Name = "Today", Value = usersToday },
                    new PieChartDataDto { Name = "Yesterday", Value = usersYesterday },
                    new PieChartDataDto { Name = "This Week", Value = usersThisWeek },
                    new PieChartDataDto { Name = "Last Week", Value = usersLastWeek },
                    new PieChartDataDto { Name = "This Year", Value = usersThisYear },
                    new PieChartDataDto { Name = "Last Year", Value = usersLastYear },
                    new PieChartDataDto { Name = "Since Start", Value = usersSinceAppStart }
                };
        }

        public async Task<bool> IsSameUser(string userId, string token)
        {
            User? userModel = await GetByIdAsync(userId);

            if (userModel == null)
            {
                throw new Exception($"User do not exist with id: {userModel.Id}");
            }

            string? loggedInUserId = _claimsHelper.GetLoggedInUserId(token);

            return userModel.Id == loggedInUserId;
        }

        public bool IsLoggedInUserAdmin(string token)
        {
            bool isAdmin = _claimsHelper.IsLoggedInUserAdmin(token);

            return isAdmin;
        }

        public async Task<bool> IsAdminOrAuthor(string userId)
        {
            User? userModel = await _userManager.FindByIdAsync(userId);

            if (userModel == null)
            {
                return false;
            }

            var roles = await _userManager.GetRolesAsync(userModel);

            if (roles.Contains("Admin") || roles.Contains("Author"))
            {
                return true;
            }

            return false;
        }
    }
}
