using System;

namespace DatingApp.Server.Services;

public interface ITokenService
{
    string CreateToken(UserModel user);
}
