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
                    Name = "Juan",
                    LastName = "Pachar",
                    Email = "jppachar@yopmail.com",
                    UserName = "jppachar",
                    Phone = "+593991883896"
                };

                await userManager.CreateAsync(user, "Jppachar1993@");
            }

            if (!context.Properties!.Any())
            {
                context.Properties!.AddRange(
                    new Property
                    {
                        Name = "Casa",
                        Address = "La Pileta",
                        Price = 50000,
                        CreatedDate = DateTime.Now,
                    },
                    new Property
                    {
                        Name = "Finca",
                        Address = "Obrapia",
                        Price = 100000,
                        CreatedDate = DateTime.Now,
                    }
                );
            }

            context.SaveChanges();
        }
    }
}