namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UserController(IUserRepository userRepo, IMapper mapper, IPhotoService photoService)
    {
        _photoService = photoService;
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

    [HttpGet("{username}", Name = "GetUser")]
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
        var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());
        _mapper.Map(member, user);
        _userRepo.Update(user);

        if (await _userRepo.SaveAllAsync())
            return NoContent();
        return BadRequest();
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());
        var result = await _photoService.AddPhotoAsync(file);

        if(result.Error != null)
            return BadRequest(result.Error.Message);

        var photo = new PhotoModel()
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if(user.Photos.Count == 0)
            photo.IsMain = true;

        user.Photos.Add(photo);

        if(await _userRepo.SaveAllAsync())
        {
            return CreatedAtRoute("GetUser", new{Username = user.Username} ,_mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problem upoloading photo");
    }
}
