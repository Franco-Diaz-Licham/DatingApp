namespace DatingApp.Server.Configuration;

public static class ConfigureApp
{
    public static async Task Config(this WebApplication app)
    {
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseMiddleware<ExceptionMiddleware>();
        
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors(x => x
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true)
            .AllowCredentials());
        app.UseAuthentication();
        app.MapHub<PresenceHub>("hubs/presence");
        app.MapHub<MessageHub>("hubs/messages");
        app.UseAuthorization();
        app.MapControllers();
        app.MapFallbackToFile("/index.html");
        await app.ConfigureDatabase();
    }
}
