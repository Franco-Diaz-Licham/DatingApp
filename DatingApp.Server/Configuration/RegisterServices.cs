namespace DatingApp.Server.Configuration;

public static class RegisterServices
{
    public static void AddServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddServices();
        services.AddDbContext<DataContext>(opt =>
            opt.UseSqlite(config.GetConnectionString("DefaultConnection")
        ));
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            opt.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("TokenKey"))),
                ValidateIssuer = false,
                ValidateAudience = false
            });
    }
}
