using Api.Entities;
using Api.Helpers;
using Api.Interfaces.Helpers;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IClaimsHelper _claimsHelper;

        public UserService(IUserRepository userRepository, IClaimsHelper claimsHelper)
        {
            _userRepository = userRepository;
            _claimsHelper = claimsHelper;
        }

        public async Task<User?> UpdateUserDescriptionAsync(string description, string id)
        {
            // Turn to DTO
            User? userModel = await GetByIdAsync(id);

            if (userModel == null)
            {
                return null;
            }

            userModel.Description = description;

            await _userRepository.UpdateUserDescriptionAsync(userModel);

            return userModel;
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            // Turn to DTO
            User? userModel = await _userRepository.GetByIdAsync(id);

            return userModel;
        }

        public async Task<bool> IsSameUser(string userId, string token)
        {
            User? userModel = await GetByIdAsync(userId);

            if (userModel == null)
            {
                throw new Exception($"User do not exist with id: {userModel.Id}");
            }

            string? loggedInUserId = _claimsHelper.GetLoggedInUserId(token);

            return userModel.Id == loggedInUserId;
        }

        public bool IsLoggedInUserAdmin(string token)
        {
            bool isAdmin = _claimsHelper.IsLoggedInUserAdmin(token);

            return isAdmin;
        }
    }
}
