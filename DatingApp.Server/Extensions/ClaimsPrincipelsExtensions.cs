namespace DatingApp.Server.Extensions;

public static class ClaimsPrincipelsExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        var username = user.FindFirst(ClaimTypes.Name)!.Value;
        return username;
    }

    public static int GetUserId(this ClaimsPrincipal user)
    {
        var id = user.FindFirst(ClaimTypes.NameIdentifier)!;
        return int.Parse(id.Value);
    }
}
