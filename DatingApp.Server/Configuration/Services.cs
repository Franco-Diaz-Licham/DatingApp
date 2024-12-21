namespace DatingApp.Server.Configuration;

public static class Services
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ILikesRepository, LikesRepository>();
        services.AddScoped<IMessagesRepository, MessageRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<LogUserActivity>();

        return services;
    }
}
