namespace server.Dtos.User
{
    public class UserResponseDto
    {
        public string? Id { get; set; }
        public string? Token { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}