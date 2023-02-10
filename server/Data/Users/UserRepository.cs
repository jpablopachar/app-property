using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Dtos.UserDtos;
using server.Middlewares;
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
            var user = await _userManager.FindByNameAsync(_userSession.getUserSession());

            if (user is null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized, new { message = "El usuario del token no se encuentra registrado." });
            }

            return TransformerUserToUserDto(user!);
        }

        public async Task<UserResponseDto> SignIn(UserLoginRequestDto userLoginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginRequestDto.Email!);

            if (user is null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized, new { message = "El email no se encuentra registrado." });
            }

            var res = await _signInManager.CheckPasswordSignInAsync(user!, userLoginRequestDto.Password!, false);

            if (res.Succeeded)
            {
                return TransformerUserToUserDto(user);
            }

            throw new MiddlewareException(HttpStatusCode.Unauthorized, new { message = "La contraseña es incorrecta." });
        }

        public async Task<UserResponseDto> SignUp(UserRegisterRequestDto userRegisterRequestDto)
        {
            var existEmail = await _context.Users.Where(user => user.Email == userRegisterRequestDto.Email).AnyAsync();

            if (existEmail)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "El email ya se encuentra registrado." });
            }

            var existUserName = await _context.Users.Where(user => user.UserName == userRegisterRequestDto.UserName).AnyAsync();

            if (existUserName)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "El nombre de usuario ya se encuentra registrado." });
            }

            var user = new User
            {
                Name = userRegisterRequestDto.Name,
                LastName = userRegisterRequestDto.LastName,
                UserName = userRegisterRequestDto.UserName,
                Email = userRegisterRequestDto.Email,
                Phone = userRegisterRequestDto.Phone
            };

            var res = await _userManager.CreateAsync(user, userRegisterRequestDto.Password!);

            if (res.Succeeded)
            {
                return TransformerUserToUserDto(user);
            }

            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "No se pudo registrar el usuario." });
        }
    }
}