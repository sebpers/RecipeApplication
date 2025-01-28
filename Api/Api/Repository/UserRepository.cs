using System.Collections.Generic;
using Api.Data;
using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Mapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task UpdateUserDescriptionAsync(User? userModel)
        {
            _context.Users.Update(userModel);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            User? userModel = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return userModel;
        }

        public async Task<IList<string>?> GetRolesByUserAsync(User userModel)
        {
            IList<string?> roles = await _userManager.GetRolesAsync(userModel);
            return roles;
        }

        // Query for dashboard - users
        public async Task<(List<QueryUserWithRolesDto>, int)> GetQueriedUsersAsync(
            string sortBy, string sortOrder, int pageNumber, int pageSize, string search
        )
        {
            var query = _context.Users.AsQueryable();

            // Apply search filter
            if (!string.IsNullOrEmpty(search))
            {
                var searchTerm = search.ToLower();

                query = query.Where(u =>
                    u.FirstName.ToLower().Contains(searchTerm) ||
                    u.LastName.ToLower().Contains(searchTerm) ||
                    u.Email.ToLower().Contains(searchTerm) ||
                    u.Id.Contains(searchTerm) || // Assuming Id is a string
                    u.CreatedAt.ToString().Contains(searchTerm) ||
                    _context.UserRoles.Any(ur => ur.UserId == u.Id &&
                        _context.Roles.Any(r => r.Id == ur.RoleId && r.Name.ToLower().Contains(searchTerm)))
                );
            }

            var totalCount = await query.CountAsync();

            // Apply sorting
            if (sortBy == "Roles")
            {
                // Join AspNetUserRoles and AspNetRoles tables to fetch roles along with users
                var userRoles = from user in query
                                join userRole in _context.UserRoles on user.Id equals userRole.UserId into userRolesGroup
                                from userRole in userRolesGroup.DefaultIfEmpty()
                                join role in _context.Roles on userRole.RoleId equals role.Id into rolesGroup
                                from role in rolesGroup.DefaultIfEmpty()  // Left join to include users with no role
                                select new { user, role = role.Name ?? "No role" };  // Fallback value when role is null

                // Sort the joined query by role
                query = sortOrder == "asc"
                    ? userRoles.OrderBy(ur => ur.role).Select(ur => ur.user)
                    : userRoles.OrderByDescending(ur => ur.role).Select(ur => ur.user);
            }
            else
            {
                if (sortBy == "First name")
                    query = sortOrder == "asc" ? query.OrderBy(u => u.FirstName) : query.OrderByDescending(u => u.FirstName);
                else if (sortBy == "Last name")
                    query = sortOrder == "asc" ? query.OrderBy(u => u.LastName) : query.OrderByDescending(u => u.LastName);
                else if (sortBy == "Email")
                    query = sortOrder == "asc" ? query.OrderBy(u => u.Email) : query.OrderByDescending(u => u.Email);
            }

            // Apply pagination
            var users = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Fetch roles for each user
            var userDtos = new List<QueryUserWithRolesDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                userDtos.Add(new QueryUserWithRolesDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Roles = roles.ToList()
                });
            }

            return (userDtos, totalCount);
        }

        public async Task<List<UserWithRolesDto>> GetUsersWithRolesAsync()
        {
            var users = await _userManager.Users
                .Include(u => u.Recipes)
                .Include(u => u.FavoriteRecipes)
                .ToListAsync();

            var result = new List<UserWithRolesDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                result.Add(new UserWithRolesDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Description = user.Description,
                    CreatedAt = user.CreatedAt,
                    Recipes = user.Recipes.Select(r => r.ToRecipeDto()).ToList(),
                    FavoriteRecipes = user.FavoriteRecipes ?? new List<UserRecipeFavorite>(),
                    Roles = roles
                });
            }

            return result;
        }

    }
}
