namespace DatingApp.Server.Interfaces;

public interface IUserRepository
{
    void Update(UserModel model);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<UserModel>> GetUsersAsync();
    Task<UserModel?> GetUserByIdAsync(int id);
    Task<UserModel?> GetUserByUsernameAsync(string username);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto> GetMemberAsync(string username);
}
