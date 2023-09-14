using server.Models;

namespace server.Token
{
    public interface IJwtGenerator
    {
        public string CreateToken(User user);
    }
}