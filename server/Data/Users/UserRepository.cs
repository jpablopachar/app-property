using Microsoft.AspNetCore.Identity;
using server.Dtos.UserDtos;
using server.Models;
using server.Token;

namespace server.Data.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly AppDbContext _context;
        private readonly IUserSession _userSession;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerator jwtGenerator, AppDbContext context, IUserSession userSession)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _context = context;
            _userSession = userSession;
        }

        private UserResponseDto TransformerUserToUserDto(User user)
        {
            return new UserResponseDto
            {
                UserId = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Phone = user.Phone,
                Token = _jwtGenerator.CreateToken(user)
            };
        }

        public async Task<UserResponseDto> GetUser()
        {
            var user = await _userManager.FindByIdAsync(_userSession.getUserSession());

            return TransformerUserToUserDto(user!);
        }

        public async Task<UserResponseDto> SignIn(UserLoginRequestDto userLoginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginRequestDto.Email!);

            await _signInManager.CheckPasswordSignInAsync(user!, userLoginRequestDto.Password!, false);

            return TransformerUserToUserDto(user!);
        }

        public async Task<UserResponseDto> SignUp(UserRegisterRequestDto userRegisterRequestDto)
        {
            var user = new User
            {
                Name = userRegisterRequestDto.Name,
                LastName = userRegisterRequestDto.LastName,
                UserName = userRegisterRequestDto.UserName,
                Email = userRegisterRequestDto.Email,
                Phone = userRegisterRequestDto.Phone
            };

            await _userManager.CreateAsync(user, userRegisterRequestDto.Password!);

            return TransformerUserToUserDto(user);
        }
    }
}