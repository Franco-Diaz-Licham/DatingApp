namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagesController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IMapper _mapper;
    private readonly IMessagesRepository _messageRepo;

    public MessagesController(IUserRepository userRepo, IMessagesRepository messageRepo, IMapper mapper)
    {
        _messageRepo = messageRepo;
        _userRepo = userRepo;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto messageDto)
    {
        var username = User.GetUsername();

        if (username == messageDto.RecipientUsername.ToLower()) return BadRequest("You cannot send messages to yourself");
        var sender = await _userRepo.GetUserByUsernameAsync(username);
        var recipient = await _userRepo.GetUserByUsernameAsync(messageDto.RecipientUsername);

        if (recipient == null) return NotFound();
        if (sender == null) return BadRequest();

        var message = new MessageModel(sender, recipient, sender.Username, recipient.Username, messageDto.Content);
        _messageRepo.AddMessage(message);

        if (await _messageRepo.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));
        return BadRequest("Failed to save message");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetAsync([FromQuery] MessageParams? messageParams)
    {
        messageParams.Username = User.GetUsername();
        var messages = await _messageRepo.GetMessageForUser(messageParams);
        Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
        return Ok(messages);
    }

    [HttpGet("thread/{username}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThreadAsync(string username)
    {
        var currentUsername = User.GetUsername();
        var output = await _messageRepo.GetMessageThread(currentUsername, username);
        return Ok(output);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        var username = User.GetUsername();
        var message = await _messageRepo.GetMessage(id);
        if(message.Sender.Username != username && message.Recipient.Username != username) return Unauthorized();
        if(message.Sender.Username == username) message.SenderDeleted = true;
        if(message.Recipient.Username == username) message.RecipientDeleted = true;
        if(message.SenderDeleted && message.RecipientDeleted) _messageRepo.DeleteMessage(message);
        if(await _messageRepo.SaveAllAsync()) return NoContent();
        return BadRequest("Message could not be deleted...");
    }
}
