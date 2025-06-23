using Serilog;
using Serilog.Events;

namespace DatingApp.Server.Configuration;

public static class ConfigureApp
{
    public static async Task Config(this WebApplication app, WebApplicationBuilder builder)
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
        else
        {
            // add logging
            var webHost = (IWebHostEnvironment)app.Services.GetService(typeof(IWebHostEnvironment))!;
            string logPath = builder.Configuration.GetValue<string>("LogFilePath")!;
            string logFile = Path.Combine(webHost.ContentRootPath, logPath);
            Log.Logger = new LoggerConfiguration().MinimumLevel.Debug()
                                                  .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                                                  .Enrich.FromLogContext()
                                                  .WriteTo.File(logFile)
                                                  .CreateLogger();
        }

        app.UsePathBase("/retail");
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors(x => 
            x.AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true)
            .AllowCredentials());
        app.UseAuthentication();
        app.MapHub<PresenceHub>("hubs/presence");
        app.MapHub<MessageHub>("hubs/messages");
        app.UseAuthorization();
        app.MapControllers();
        app.MapFallbackToController("index", "Fallback");
        await app.ConfigureDatabase();
    }
}
