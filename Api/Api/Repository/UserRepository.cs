using Api.Data;
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
    }
}
