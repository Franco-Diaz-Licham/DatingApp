#nullable disable
namespace DatingApp.Server.Data.User;

public class UserRepository : IUserRepository
{
    private readonly DataContext _db;
    private readonly IMapper _mapper;
    public UserRepository(DataContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<MemberDto> GetMemberAsync(string username)
    {
        return await _db.Users
            .Where(u => u.Username == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await _db.Users
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<UserModel?> GetUserByIdAsync(int id)
    {
        return await _db.Users.FindAsync(id);
    }

    public async Task<UserModel?> GetUserByUsernameAsync(string username)
    {
        return await _db.Users
            .Include(u => u.Photos)
            .SingleOrDefaultAsync(u => u.Username == username);
    }

    public async Task<IEnumerable<UserModel>> GetUsersAsync()
    {
        return await _db.Users
            .Include(u => u.Photos)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _db.SaveChangesAsync() > 0;
    }

    public void Update(UserModel model)
    {
        _db.Entry(model).State = EntityState.Modified;
    }
}
