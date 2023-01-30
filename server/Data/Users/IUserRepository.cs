using server.Dtos.UserDtos;

namespace server.Data.Users
{
    public interface IUserRepository
    {
        Task<UserResponseDto> GetUser();

        Task<UserResponseDto> SignIn(UserLoginRequestDto userLoginRequestDto);

        Task<UserResponseDto> SignUp(UserRegisterRequestDto userRegisterRequestDto);
    }
}