namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly DataContext _db;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(DataContext db, ITokenService tokenService, IMapper mapper)
    {
        _mapper = mapper;
        _db = db;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (await UserExists(registerDto.Username)) return BadRequest("User already exists");
        
        var user = _mapper.Map<UserModel>(registerDto);
        using var hmac = new HMACSHA512();
        user.Username = registerDto.Username.ToLower();
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
        user.PasswordSalt = hmac.Key;

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var output = new UserDto()
        {
            Username = user.Username,
            Token = _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };

        return Ok(output);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _db.Users.Include(p => p.Photos).SingleOrDefaultAsync(u => u.Username == loginDto.Username);

        if (user == null)
            return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computerHash.Length; i++)
            if (computerHash[i] != user.PasswordHash[i])
                return Unauthorized("Invalid password");

        var output = new UserDto()
        {
            Username = user.Username,
            Token = _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };

        return Ok(output);
    }

    private async Task<bool> UserExists(string username)
    {
        return await _db.Users.AnyAsync(u => u.Username == username.ToLower());
    }
}

