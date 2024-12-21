namespace DatingApp.Server.Data.Repositories.Messages;

public interface IMessagesRepository
{
    void AddMessage(MessageModel message);
    void DeleteMessage(MessageModel message);
    Task<MessageModel?> GetMessage(int id);
    Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);
    Task<bool> SaveAllAsync();
}