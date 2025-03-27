using Api.Dtos;
using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface IUserAuthorFavoriteRepository
    {
        Task AddAsync(UserAuthorFavorite UserAuthorFavoriteModel);
        Task<UserAuthorFavorite?> GetByIdsAsync(string userId, string authorId);
        Task<List<UserAuthorFavorite>?> GetAllAsync();
        Task<List<AuthorLimitedListDto>> GetFavoredAuthorsByUserIdAsync(string userId);
        Task RemoveFavoredAuthorAsync(UserAuthorFavorite UserAuthorFavoriteModel);
    }
}
