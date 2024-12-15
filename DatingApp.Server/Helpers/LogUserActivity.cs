using DatingApp.Server.Data.Repositories.User;

namespace DatingApp.Server.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();
        if(resultContext.HttpContext.User.Identity!.IsAuthenticated == false) return;
        var userId = resultContext.HttpContext.User.GetUserId();
        var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>()!;
        var user = await repo.GetUserByIdAsync(userId);
        user!.LastActive = DateTime.Now;
        await repo.SaveAllAsync();
    }
}
