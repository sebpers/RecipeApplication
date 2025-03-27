using Api.Dtos;

namespace Api.Interfaces.Service
{
    public interface IAuthorService
    {
        public Task<List<AuthorDto>> GetAllAsync();
        public Task<List<AuthorLimitedListInfoDto>> GetAllLimitedInfoAsync(string? currentUserId);
    }
}
