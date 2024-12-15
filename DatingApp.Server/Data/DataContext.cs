namespace DatingApp.Server.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options):base(options){ }

    public DbSet<UserModel> Users {get; set;}
    public DbSet<UserLikeModel> Likes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // implement M:N relationship, one side followed by the other side
        builder.Entity<UserLikeModel>().HasKey(k => new {k.SourceUserId, k.LikedUserId});
        builder.Entity<UserLikeModel>().HasOne(s => s.SourceUser).WithMany(l => l.LikedUsers).HasForeignKey(s => s.SourceUserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<UserLikeModel>().HasOne(s => s.LikedUser).WithMany(l => l.LikedByUsers).HasForeignKey(s => s.LikedUserId).OnDelete(DeleteBehavior.Cascade);
    }
}
