using Api.Dtos;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Interfaces.Service
{
    public interface IUserFavoriteAuthorService
    {
        Task<bool> AddAsync(string authorId, string favoredById);
        Task<List<UserAuthorFavorite>?> GetAllUserFavoritesAsync();
        Task<List<AuthorLimitedListDto>?> GetFavoredAuthorsByUserIdAsync(string userId);
        Task RemoveFavoredAuthorAsync(UserAuthorFavorite favoredAuthor);
    }
}
