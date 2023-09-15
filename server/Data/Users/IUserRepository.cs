using server.Dtos.User;

namespace server.Data.Users
{
    public interface IUserRepository
    {
        Task<UserResponseDto> GetUser();
        Task<UserResponseDto> Login(UserLoginRequestDto userLoginRequestDto);
        Task<UserResponseDto> Register(UserRegisterRequestDto userRegisterRequestDto);
    }
}