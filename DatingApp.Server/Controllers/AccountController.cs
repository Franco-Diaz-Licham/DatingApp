namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly DataContext _db;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext db, ITokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (await UserExists(registerDto.Username))
            return BadRequest("User already exists");

        try
        {
            using var hmac = new HMACSHA512();
            var user = new UserModel()
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var output = new UserDto()
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };

            return Ok(output);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == loginDto.Username);

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
            Token = _tokenService.CreateToken(user)
        };

        return Ok(output);
    }

    private async Task<bool> UserExists(string username)
    {
        return await _db.Users.AnyAsync(u => u.Username == username.ToLower());
    }
}

