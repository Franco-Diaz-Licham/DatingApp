namespace DatingApp.Server.Configuration;

public static class Services
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        services.AddScoped<IPhotoService, PhotoService>();
        return services;
    }
}
