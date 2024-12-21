namespace DatingApp.Server.Data.Repositories.Messages;

public class MessageRepository : IMessagesRepository
{
    private readonly DataContext _db;
    private readonly IMapper _mapper;
    public MessageRepository(DataContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public void AddMessage(MessageModel message)
    {
        _db.Messages.Add(message);
    }

    public void DeleteMessage(MessageModel message)
    {
        _db.Messages.Remove(message);
    }

    public async Task<MessageModel?> GetMessage(int id)
    {
        var output = await _db.Messages.Where(m => m.Id == id).Include(u => u.Sender).Include(u => u.Recipient).FirstOrDefaultAsync();
        return output;
    }

    public async Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams)
    {
        var query = _db.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

        switch (messageParams.Container)
        {
            case "Inbox": query = query.Where(u => u.Recipient.Username == messageParams.Username && u.RecipientDeleted == false); break;
            case "Outbox": query = query.Where(u => u.Sender.Username == messageParams.Username && u.SenderDeleted == false); break;
            default: query = query.Where(u => u.Recipient.Username == messageParams.Username && u.RecipientDeleted == false && u.DateRead == null); break;
        }

        var output = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).AsNoTracking();
        return await PagedList<MessageDto>.CreateAsync(output, messageParams.PageNumber, messageParams.PageSize);
    }

    public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
    {
        var messages = await _db.Messages
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
            .Where(m => (m.Recipient.Username == currentUsername && m.Sender.Username == recipientUsername && m.RecipientDeleted == false) ||
                        (m.Recipient.Username == recipientUsername && m.Sender.Username == currentUsername && m.SenderDeleted == false))
            .OrderBy(m => m.MessageSent).ToListAsync();

        var unreadMessages = messages.Where(m => m.DateRead == null && m.Recipient.Username == currentUsername).ToList();

        if (unreadMessages.Any())
        {
            foreach (var message in unreadMessages) message.DateRead = DateTime.Now;
            await _db.SaveChangesAsync();
        }

        return _mapper.Map<IEnumerable<MessageDto>>(messages);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _db.SaveChangesAsync() > 0;
    }
}
