namespace DatingApp.Server.Configuration;

public static class IdentityServices
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<UserModel>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;
        })
        .AddRoles<AppRoleModel>()
        .AddUserManager<UserManager<UserModel>>()
        .AddRoleManager<RoleManager<AppRoleModel>>()
        .AddSignInManager<SignInManager<UserModel>>()
        .AddRoleValidator<RoleValidator<AppRoleModel>>()
        .AddEntityFrameworkStores<DataContext>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            opt.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("TokenKey"))),
                ValidateIssuer = false,
                ValidateAudience = false
            });

        services.AddAuthorization(opt =>
        {
            opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
        });
        
        return services;
    }
}
