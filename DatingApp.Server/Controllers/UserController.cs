namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IMapper _mapper;

    public UserController(IUserRepository userRepo, IMapper mapper)
    {
        _userRepo = userRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetAllAsync()
    {
        var users = await _userRepo.GetMembersAsync();
        if (users.Any() == false)
            return NotFound();
        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetAsync(string username)
    {
        var user = await _userRepo.GetMemberAsync(username);
        if (user == null)
            return NotFound();
        return Ok(user);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateAsync(MemberUpdateDto member)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userRepo.GetUserByUsernameAsync(username);
        _mapper.Map(member, user);
        _userRepo.Update(user);

        if (await _userRepo.SaveAllAsync())
            return NoContent();
        return BadRequest();
    }
}
