using Api.Entities;
using Api.Mapper;

namespace Api.Interfaces.Repository
{
    public interface IUserRepository
    {
        Task UpdateUserDescriptionAsync(User? userModel);
        Task<User?> GetByIdAsync(string id);
    }
}
