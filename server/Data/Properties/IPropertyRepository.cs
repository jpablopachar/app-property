using server.Models;

namespace server.Data.Properties
{
    public interface IPropertyRepository
    {
        Task<bool> SaveChanges();
        Task<IEnumerable<Property>> GetAllProperties();
        Task<Property> GetPropertyById(int id);
        Task CreateProperty(Property property);
        Task DeleteProperty(int id);
    }
}