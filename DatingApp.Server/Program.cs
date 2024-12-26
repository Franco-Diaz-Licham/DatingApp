public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddServices(builder.Configuration);

        var app = builder.Build();
        await app.Config(builder);
        await app.RunAsync();
    }
}
