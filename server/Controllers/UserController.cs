using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data.Users;
using server.Dtos.UserDtos;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [HttpPost("ingresar")]
        public async Task<ActionResult<UserResponseDto>> SignIn([FromBody] UserLoginRequestDto userLoginRequestDto)
        {
            return await _userRepository.SignIn(userLoginRequestDto);
        }

        [AllowAnonymous]
        [HttpPost("registrar")]
        public async Task<ActionResult<UserResponseDto>> SignUp([FromBody] UserRegisterRequestDto userRegisterRequestDto)
        {
            return await _userRepository.SignUp(userRegisterRequestDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> GetUser()
        {
            return await _userRepository.GetUser();
        }
    }
}