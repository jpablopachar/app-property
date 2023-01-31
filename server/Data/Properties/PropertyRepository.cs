using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Middlewares;
using server.Models;
using server.Token;

namespace server.Data.Properties
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserSession _userSession;
        private readonly UserManager<User> _userManager;

        public PropertyRepository(AppDbContext context, IUserSession sesion, UserManager<User> userManager)
        {
            _context = context;
            _userSession = sesion;
            _userManager = userManager;
        }

        public async Task CreateProperty(Property property)
        {
            var user = await _userManager.FindByIdAsync(_userSession.getUserSession());

            if (user is null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized, new { message = "El usuario es inválido." });
            }

            if (property is null)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "Los datos del inmueble son incorrectos." });
            }

            property.CreatedAt = DateTime.Now;
            property.UserId = Guid.Parse(user!.Id);

            await _context.Properties.AddAsync(property);
        }

        public async Task DeleteProperty(int id)
        {
            var property = await _context.Properties!.FirstOrDefaultAsync(property => property.PropertyId == id);

            _context.Properties!.Remove(property!);
        }

        public async Task<IEnumerable<Property>> GetAllProperties()
        {
            return await _context.Properties!.ToListAsync();
        }

        public async Task<Property> GetProperty(int id)
        {
            return await _context.Properties!.FirstOrDefaultAsync(property => property.PropertyId == id)!;
        }

        public async Task<bool> SaveChanges()
        {
            return ((await _context.SaveChangesAsync()) >= 0);
        }
    }
}