namespace DatingApp.Server.Models.Entities;

public class MessageModel
{
    public MessageModel() { }
    
    public MessageModel(UserModel sender, UserModel recipient, string senderUsername, string recipientUsername, string content)
    {
        Sender = sender;
        Recipient = recipient;
        SenderUsername = senderUsername;
        RecipientUsername = recipientUsername;
        Content = content;
    }

    public int Id { get; set; }
    public int SenderId { get; set; }
    public string SenderUsername { get; set; }
    public UserModel? Sender { get; set; }
    public int RecipientId { get; set; }
    public string RecipientUsername { get; set; }
    public UserModel? Recipient { get; set; }
    public string Content { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime? MessageSent { get; set; } = DateTime.Now;
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }
}
