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
                name = "Admin",
                lastName = "Admin",
                phone = "1234567890"
            };

            await userManager.CreateAsync(user, "Admin123*");
        }

        if (!context.Properties.Any())
        {
            context.Properties.AddRange(
                new Models.Property
                {
                    name = "Casa en el campo",
                    address = "Calle falsa 123",
                    price = 200000,
                    picture = "https://picsum.photos/200/300",
                    createdAt = DateTime.Now
                },
                new Models.Property
                {
                    name = "Casa en la ciudad",
                    address = "Calle falsa 456",
                    price = 100000,
                    picture = "https://picsum.photos/200/300",
                    createdAt = DateTime.Now
                },
                new Models.Property
                {
                    name = "Casa en la playa",
                    address = "Calle falsa 789",
                    price = 300000,
                    picture = "https://picsum.photos/200/300",
                    createdAt = DateTime.Now
                }
            );

            await context.SaveChangesAsync();
        }
    }
}