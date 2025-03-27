using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Service;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AuthorService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<AuthorDto>> GetAllAsync()
        {
            List<User> users = await _userManager.Users.ToListAsync();

            // Get all users as "Author"
            var authors = new List<AuthorDto>();

            foreach (var user in users)
            {
                if (await IsAuthorAsync(user))
                {
                    AuthorDto author = _mapper.Map<AuthorDto>(user);
                    authors.Add(author);
                }
            }

            return authors;
        }

        public async Task<List<AuthorLimitedListInfoDto>> GetAllLimitedInfoAsync(string? currentUserId)
        {
            List<User> users = await _userManager.Users
                .Include(u => u.FavoritedBy)
                .ToListAsync();

            var authors = new List<AuthorLimitedListInfoDto>();

            foreach (var user in users)
            {
                if (await IsAuthorAsync(user))
                {
                    AuthorLimitedListInfoDto author = _mapper.Map<AuthorLimitedListInfoDto>(user);

                    if (currentUserId != null)
                    {
                        author.IsFavorited = author.FavoritedBy?.Any(f => f.UserId == currentUserId) ?? false;
                    }

                    authors.Add(author);
                }
            }

            return authors;
        }

        private async Task<bool> IsAuthorAsync(User user)
        {
            bool isAuthor = await _userManager.IsInRoleAsync(user, "Author");

            bool adminHasRecipes = await _userManager.Users
                .Where(u => u.Id == user.Id)
                .Select(u => u.Recipes != null && u.Recipes.Any())
                .FirstOrDefaultAsync();

            return isAuthor || adminHasRecipes;
        }
    }
}
