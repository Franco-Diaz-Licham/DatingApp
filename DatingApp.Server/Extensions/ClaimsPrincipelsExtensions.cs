namespace DatingApp.Server.Extensions;

public static class ClaimsPrincipelsExtensions
{
    public static string? GetUsername(this ClaimsPrincipal user)
    {
         var username = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
         return username;
    }
}
