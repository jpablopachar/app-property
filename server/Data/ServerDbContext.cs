using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ServerDbContext : IdentityDbContext<User>
    {
        public ServerDbContext(DbContextOptions<ServerDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<User>().Property(x => x.NormalizedUserName).HasMaxLength(90);
            builder.Entity<IdentityRole>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<IdentityRole>().Property(x => x.NormalizedName).HasMaxLength(90);
        }

        public DbSet<Property>? Properties { get; set; }
    }
}