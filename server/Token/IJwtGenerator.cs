using server.Models;

namespace server.Token
{
    public interface IJwtGenerator
    {
        string CreateToken(User user);
    }
}