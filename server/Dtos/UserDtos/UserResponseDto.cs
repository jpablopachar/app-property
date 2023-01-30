namespace server.Dtos.UserDtos
{
    public class UserResponseDto
    {
        public string? UserId { get; set; }
        public string? Token { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}