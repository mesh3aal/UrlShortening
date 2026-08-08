using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using ShorterUrls.Cache;
using ShorterUrls.Data;
using urlshort.Endpoints;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Authentication:ValidIssuer"];
        options.Audience = builder.Configuration["Authentication:Audience"] ?? "account";
        options.RequireHttpsMetadata = false;
    });


builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://localhost:8080/realms/urlshort/protocol/openid-connect/auth"),
                TokenUrl = new Uri("https://localhost:8080/realms/urlshort/protocol/openid-connect/token"),
                Scopes = new Dictionary<string, string> { { "openid", "Openid" }, { "profile","profile"} }
            }
        }
    });
    c.AddSecurityRequirement(doc => new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecuritySchemeReference("oauth2",doc),
            []
        }
    });
});

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<RandomizedCharachters>();
builder.Services.AddScoped<IRedisCache, RedisCache>();

builder.AddRedisDistributedCache(connectionName: "mycache");

builder.AddNpgsqlDbContext<ApplicationDbContext>("urlshortening");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{

    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await context.Database.EnsureCreatedAsync();

    if ((await context.Database.GetPendingMigrationsAsync()).Any())
    {
        await context.Database.MigrateAsync();
    }
}

app.MapDefaultEndpoints();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger(c =>
    {
        c.RouteTemplate = "docs/{documentName}/swagger.json";
    });
    app.UseSwaggerUI(c =>
    {
        c.RoutePrefix = "docs";
        c.SwaggerEndpoint("/docs/v1/swagger.json", "ShorterUrl API V1");
        c.OAuthClientId("urlshort");
        c.OAuthUsePkce();
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapEndpoints();

app.Run();