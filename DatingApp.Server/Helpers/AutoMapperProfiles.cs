namespace DatingApp.Server.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserModel, MemberDto>()
            .ForMember(dest => dest.PhotoUrl, 
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age,
                opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
        CreateMap<PhotoModel, PhotoDto>();
        CreateMap<MemberUpdateDto, UserModel>();
    }
}
