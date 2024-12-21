namespace DatingApp.Server.Data.Repositories.User;

public interface IUserRepository
{
    void Update(UserModel model);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<UserModel>> GetUsersAsync();
    Task<UserModel?> GetUserByIdAsync(int id);
    Task<UserModel?> GetUserByUsernameAsync(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto?> GetMemberAsync(string username);
}
