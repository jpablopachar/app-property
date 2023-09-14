using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Data
{
    public class ServerDbContextData
    {
        public static async Task InsertData(ServerDbContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    Name = "Test User",
                    LastName = "Test User",
                    Email = "jppachar@gmail.com",
                    UserName = "jppachar",
                    Phone = "0991883896"
                };

                await userManager.CreateAsync(user, "alaoa");
            }

            if (!context.Properties!.Any())
            {
                context.Properties!.AddRange(
                    new Property
                    {
                        Name = "Casa",
                        Address = "Calle 1",
                        Price = 100000,
                        CreatedDate = DateTime.Now,
                    },
                    new Property
                    {
                        Name = "Casa",
                        Address = "Calle 1",
                        Price = 100000,
                        CreatedDate = DateTime.Now,
                    }
                );
            }

            context.SaveChanges();
        }
    }
}