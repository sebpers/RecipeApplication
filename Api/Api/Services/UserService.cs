using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Helpers;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;

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

        public async Task<UserDto?> UpdateUserDescriptionAsync(string description, string id)
        {
            User? userModel = await GetByIdAsync(id);

            if (userModel == null)
            {
                return null;
            }

            userModel.Description = description;

            await _userRepository.UpdateUserDescriptionAsync(userModel);

            return userModel.ToUserDto();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            User? userModel = await _userRepository.GetByIdAsync(id);

            return userModel;
        }

        public async Task<UserWithRolesDto> GetUserWithRolesAsync(string id)
        {
            User? userModel = await _userRepository.GetByIdAsync(id);

            if (userModel == null)
            {
                throw new Exception($"User do not exist with id: {userModel.Id}");
            }

            IList<string?> roles = await _userRepository.GetRolesByUserAsync(userModel);

            UserWithRolesDto userWithRoles = userModel.ToUserWithRolesDto(roles);

            return userWithRoles;
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
