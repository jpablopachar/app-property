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
        private readonly ServerDbContext _context;
        private readonly IUserSession _userSession;
        private readonly UserManager<User> _userManager;

        public PropertyRepository(ServerDbContext context, IUserSession userSession, UserManager<User> userManager)
        {
            _context = context;
            _userSession = userSession;
            _userManager = userManager;
        }

        public async Task CreateProperty(Property property)
        {
            var user = await _userManager.FindByNameAsync(_userSession.GetUserSession());

            if (user is null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized, new { message = "El usuario no es valido para hacer esta inserción" });
            }

            if (property is null)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "Los datos de la propiedad son incorrectos." });
            }

            property.CreatedDate = DateTime.Now;
            property.UserId = Guid.Parse(user!.Id);

            await _context.Properties!.AddAsync(property);
        }

        public async Task DeleteProperty(int id)
        {
            var property = await _context.Properties!.FirstOrDefaultAsync(p => p.Id == id);

            _context.Properties!.Remove(property!);
        }

        public async Task<IEnumerable<Property>> GetAllProperties()
        {
            return await _context.Properties!.ToListAsync();
        }

        public async Task<Property> GetPropertyById(int id)
        {
            return await _context.Properties!.FirstOrDefaultAsync(p => p.Id == id)!;
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}