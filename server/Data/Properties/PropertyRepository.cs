using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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

        public Task CreateProperty(Property property)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Property>> GetAllProperties()
        {
            throw new NotImplementedException();
        }

        public Task<Property> GetPropertyById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}