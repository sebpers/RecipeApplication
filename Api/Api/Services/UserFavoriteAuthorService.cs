using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class UserFavoriteAuthorService : IUserFavoriteAuthorService
    {
        private readonly IUserAuthorFavoriteRepository _authorFavoriteRepository;

        public UserFavoriteAuthorService(IUserAuthorFavoriteRepository authorFavoriteRepository)
        {
            _authorFavoriteRepository = authorFavoriteRepository;
        }

        public async Task<bool> AddAsync(string favoredById, string authorId)
        {
            if (authorId.IsNullOrEmpty() || favoredById.IsNullOrEmpty())
            {
                throw new NullReferenceException("Author id or user id is null.");
            }

            bool isAdded;

            try
            {
                var favoredAuthors = await _authorFavoriteRepository.GetByIdsAsync(favoredById, authorId);

                if (favoredAuthors != null)
                {
                    await RemoveFavoredAuthorAsync(favoredAuthors);
                    isAdded = false;
                }
                else
                {
                    var favoredAuthor = new UserAuthorFavorite
                    {
                        UserId = favoredById,
                        AuthorId = authorId
                    };

                    await _authorFavoriteRepository.AddAsync(favoredAuthor);
                    isAdded = true;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return isAdded;
        }

        public async Task<List<UserAuthorFavorite>?> GetAllUserFavoritesAsync()
        {
            var res = await _authorFavoriteRepository.GetAllAsync();

            return res;
        }

        public async Task<List<AuthorLimitedListDto>?> GetFavoredAuthorsByUserIdAsync(string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new NullReferenceException("Author id or user id is null.");
            }

            try
            {
                return await _authorFavoriteRepository.GetFavoredAuthorsByUserIdAsync(userId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task RemoveFavoredAuthorAsync(UserAuthorFavorite favoredAuthor)
        {
            await _authorFavoriteRepository.RemoveFavoredAuthorAsync(favoredAuthor);
        }
    }
}
