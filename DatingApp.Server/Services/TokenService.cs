namespace DatingApp.Server.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
        string key = config.GetValue<string>("TokenKey");
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
    }

    public string CreateToken(UserModel user)
    {
        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.Username)
        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescrp = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescrp);
        return tokenHandler.WriteToken(token);
    }
}
