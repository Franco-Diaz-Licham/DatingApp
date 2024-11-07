namespace DatingApp.Server.Data.Seed;

public class Seed
{
    public static async Task SeedUsers(DataContext data)
    {
        if (await data.Users.AnyAsync())
            return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var users = JsonSerializer.Deserialize<List<UserModel>>(userData);
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.Username = user.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("welcome1"));
            user.PasswordSalt = hmac.Key;
            data.Users.Add(user);
        }

        await data.SaveChangesAsync();
    }
}
