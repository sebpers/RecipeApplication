using Api.Dtos;
using Api.Entities;
using Api.Requests.Registration;
using AutoMapper;

namespace Api.AutoMapper
{
    public class MappingUserProfile : Profile
    {

        public MappingUserProfile()
        {
            // Map User username to UserForRegistrationRequest email instead
            CreateMap<UserForRegistrationRequest, User>()
                .ForMember(u => u.UserName, option => option.MapFrom(o => o.Email));

            // Map user to UserDto
            CreateMap<User, UserDto>();

            // Map user to AuthorDto...
            CreateMap<User, AuthorDto>();
            //CreateMap<User, AuthorLimitedListInfoDto>();
            CreateMap<User, AuthorLimitedListInfoDto>()
                .ForMember(dest => dest.FavoritedBy, opt => opt.MapFrom(src => src.FavoritedBy));

            CreateMap<UserAuthorFavorite, UserAuthorFavoriteDto>();
            // Map only to IDs
            CreateMap<UserAuthorFavorite, UserAuthorFavoriteDto>()
                .ForMember(uaf => uaf.UserAuthorFavoriteId, option => option.MapFrom(src => src.Id));

        }
    }
}
