namespace DatingApp.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options):base(options){ }

    public DbSet<UserModel> Users {get; set;}
}
