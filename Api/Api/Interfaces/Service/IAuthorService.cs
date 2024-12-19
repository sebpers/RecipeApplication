using Api.Dtos;
using Api.Entities;

namespace Api.Interfaces.Service
{
    public interface IAuthorService
    {
        public Task<List<AuthorDto>> GetAllAsync();
        public Task<List<AuthorLimitedListInfoDto>> GetAllLimitedInfoAsync();
    }
}
