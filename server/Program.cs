using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Data.Properties;
using server.Data.Users;
using server.Middlewares;
using server.Models;
using server.Profiles;
using server.Token;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(option =>
{
    option.LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information).EnableSensitiveDataLogging();
    option.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection"));
});

builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();

// Add services to the container.

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

    options.Filters.Add(new AuthorizeFilter(policy));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new PropertyProfile());
});

IMapper mapper = mapperConfig.CreateMapper();

builder.Services.AddSingleton(mapper);

var builderSecurity = builder.Services.AddIdentityCore<User>();
var identityBuilder = new IdentityBuilder(builderSecurity.UserType, builder.Services);

identityBuilder.AddEntityFrameworkStores<AppDbContext>();
identityBuilder.AddSignInManager<SignInManager<User>>();
builder.Services.AddSingleton<ISystemClock, SystemClock>();
builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
builder.Services.AddScoped<IUserSession, UserSession>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("corsapp", builder =>
    {
        builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ManagerMiddleware>();

app.UseAuthentication();
// app.UseHttpsRedirection();
app.UseCors("corsapp");

app.UseAuthorization();

app.MapControllers();

using (var environment = app.Services.CreateScope())
{
    var services = environment.ServiceProvider;

    try
    {
        var userManager = services.GetRequiredService<UserManager<User>>();
        var context = services.GetRequiredService<AppDbContext>();

        await context.Database.MigrateAsync();
        await LoadDatabase.InsertData(context, userManager);
    }
    catch (Exception exception)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();

        logger.LogError(exception, "Se produjo un error al realizar la migración de la base de datos.");
    }
}

app.Run();
