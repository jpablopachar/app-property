using Microsoft.AspNetCore.Identity;
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

            property.CreatedAt = DateTime.Now;
            property.UserId = Guid.Parse(user!.Id);

            _context.Properties.Add(property);
        }

        public void DeleteProperty(Property property)
        {
            var properties = _context.Properties!.FirstOrDefault(property => property.PropertyId == property.PropertyId);

            _context.Properties.Remove(properties!);
        }

        public IEnumerable<Property> GetAllProperties()
        {
            return _context.Properties!.ToList();
        }

        public Property GetPropertyById(int id)
        {
            return _context.Properties!.FirstOrDefault(property => property.PropertyId == id)!;
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}