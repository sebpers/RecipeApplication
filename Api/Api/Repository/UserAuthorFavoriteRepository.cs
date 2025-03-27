using Api.Data;
using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class UserAuthorFavoriteRepository : IUserAuthorFavoriteRepository
    {
        private readonly ApplicationDbContext _context;

        public UserAuthorFavoriteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserAuthorFavorite UserAuthorFavoriteModel)
        {
            await _context.UserAuthorFavorites.AddAsync(UserAuthorFavoriteModel);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserAuthorFavorite>?> GetAllAsync()
        {
            return await _context.UserAuthorFavorites
                .Include(uaf => uaf.Author)
                .Where(uaf => uaf != null && uaf.Author != null)
                .ToListAsync();
        }

        public async Task<List<AuthorLimitedListDto>> GetFavoredAuthorsByUserIdAsync(string userId)
        {
            List<AuthorLimitedListDto> authors = await _context.UserAuthorFavorites
                .Where(uaf => uaf.UserId == userId)
                .Select(uaf => new AuthorLimitedListDto
                {
                    Id = uaf.AuthorId,
                    FirstName = uaf.Author.FirstName,
                    LastName = uaf.Author.LastName,
                    IsFavorited = true
                })
                .ToListAsync();

            return authors;
        }

        public async Task<UserAuthorFavorite?> GetByIdsAsync(string userId, string authorId)
        {
            var favoredAuthorConnection = await _context.UserAuthorFavorites
                .FirstOrDefaultAsync(uaf => uaf.UserId == userId && uaf.AuthorId == authorId);

            return favoredAuthorConnection;
        }

        public async Task RemoveFavoredAuthorAsync(UserAuthorFavorite UserAuthorFavoriteModel)
        {
            _context.Remove(UserAuthorFavoriteModel);
            await _context.SaveChangesAsync();
        }
    }
}
