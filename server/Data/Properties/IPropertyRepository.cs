using server.Models;

namespace server.Data.Properties
{
    public interface IPropertyRepository
    {
        bool SaveChanges();

        IEnumerable<Property> GetAllProperties();

        Property GetPropertyById(int id);

        Task CreateProperty(Property property);

        void DeleteProperty(Property property);
    }
}