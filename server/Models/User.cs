using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {
        public string? name { get; set; }
        public string? lastName { get; set; }
        public string? phone { get; set; }
    }
}