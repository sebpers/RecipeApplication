using Api.Data;
using Api.Entities;
using Api.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
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
    }
}
