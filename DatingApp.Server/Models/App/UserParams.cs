namespace DatingApp.Server.Models.App;

public class UserParams : PaginationParams
{
    public string CurrentUserName { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public int MinAge { get; set; } = 18;
    public int MaxAge { get; set; } = 150;
    public string OrderBy { get; set; } = "lastActive";
}