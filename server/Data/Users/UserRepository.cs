using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Dtos.User;
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
        private readonly ServerDbContext _context;
        private readonly IUserSession _userSession;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerator jwtGenerator, ServerDbContext context, IUserSession userSession)
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
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Phone = user.Phone,
                Email = user.Email,
                Username = user.UserName,
                Token = _jwtGenerator.CreateToken(user)
            };
        }

        public async Task<UserResponseDto> GetUser()
        {
            var user = await _userManager.FindByNameAsync(_userSession.GetUserSession());

            if (user is null)
            {
                throw new MiddlewareException(
                HttpStatusCode.Unauthorized,
                new { message = "El usuario del token no existe en la base de datos" }
            );
            }

            return TransformerUserToUserDto(user!);
        }

        public async Task<UserResponseDto> Login(UserLoginRequestDto userLoginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginRequestDto.Email!);

            if (user is null)
            {
                throw new MiddlewareException(
                    HttpStatusCode.Unauthorized,
                    new { message = "El usuario no existe en la base de datos" }
                );
            }

            var res = await _signInManager.CheckPasswordSignInAsync(user, userLoginRequestDto.Password!, false);

            if (res.Succeeded)
            {
                return TransformerUserToUserDto(user);
            }

            throw new MiddlewareException(
                HttpStatusCode.Unauthorized,
                new { message = "La contraseña es incorrecta" }
            );
        }

        public async Task<UserResponseDto> Register(UserRegisterRequestDto userRegisterRequestDto)
        {
            var email = await _context.Users.Where(u => u.Email == userRegisterRequestDto.Email).AnyAsync();

            if (email)
            {
                throw new MiddlewareException(
                    HttpStatusCode.BadRequest,
                    new { message = "El email ya existe en la base de datos" }
                );
            }

            var username = await _context.Users.Where(u => u.UserName == userRegisterRequestDto.Username).AnyAsync();

            if (username)
            {
                throw new MiddlewareException(
                    HttpStatusCode.BadRequest,
                    new { message = "El username ya existe en la base de datos" }
                );
            }

            var user = new User
            {
                Name = userRegisterRequestDto.Name,
                LastName = userRegisterRequestDto.LastName,
                Phone = userRegisterRequestDto.Phone,
                Email = userRegisterRequestDto.Email,
                UserName = userRegisterRequestDto.Username
            };

            var res = await _userManager.CreateAsync(user, userRegisterRequestDto.Password!);

            if (res.Succeeded)
            {
                return TransformerUserToUserDto(user);
            }

            throw new MiddlewareException(
                HttpStatusCode.BadRequest,
                new { message = "No se pudo crear el usuario" }
            );
        }
    }
}