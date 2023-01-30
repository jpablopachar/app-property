using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Data;

public class LoadDatabase
{
    public static async Task InsertData(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "admin",
                Email = "admin1@yopmail.com",
                Name = "Admin",
                LastName = "Admin",
                Phone = "1234567890"
            };

            await userManager.CreateAsync(user, "Admin123*");
        }

        if (!context.Properties.Any())
        {
            context.Properties.AddRange(
                new Models.Property
                {
                    Name = "Casa en el campo",
                    Address = "Calle falsa 123",
                    Price = 200000,
                    Picture = "https://picsum.photos/200/300",
                    CreatedAt = DateTime.Now
                },
                new Models.Property
                {
                    Name = "Casa en la ciudad",
                    Address = "Calle falsa 456",
                    Price = 100000,
                    Picture = "https://picsum.photos/200/300",
                    CreatedAt = DateTime.Now
                },
                new Models.Property
                {
                    Name = "Casa en la playa",
                    Address = "Calle falsa 789",
                    Price = 300000,
                    Picture = "https://picsum.photos/200/300",
                    CreatedAt = DateTime.Now
                }
            );

            await context.SaveChangesAsync();
        }
    }
}