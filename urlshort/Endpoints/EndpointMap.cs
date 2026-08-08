using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ShorterUrls.Cache;
using ShorterUrls.Data;
using System.Security.Claims;

namespace urlshort.Endpoints
{
    internal static class EndpointMap
    {
        public static void MapEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("shorturl", async (urlshortenRequest url, RandomizedCharachters helper, ApplicationDbContext context, HttpContext http) =>
            {
                if (url.Alias != null)
                {
                    if (!Uri.TryCreate(url.Url, UriKind.Absolute, out _))
                    {
                        return Results.BadRequest("الرابط المعطى غير صحيح");
                    }

                    if (await context.Urls.AnyAsync(x => x.Id == url.Alias))
                    {
                        return Results.BadRequest("هذا الاختصار مرتبط مسبقاً");
                    }

                    var validUrlObject = new Url
                    {
                        Id = url.Alias,
                        LongUrl = url.Url,
                        ShortUrl = $"{http.Request.Scheme}://{http.Request.Host}/{url.Alias}"
                    };
                    context.Urls.Add(validUrlObject);

                    await context.SaveChangesAsync();

                    return Results.Ok(new UrlShortenResponse
                    {
                        ShortenUrl = validUrlObject.ShortUrl
                    });
                }

                if (!Uri.TryCreate(url.Url, UriKind.Absolute, out _))
                {
                    return Results.BadRequest("الرابط المعطى غير صحيح");
                }

                var randomId = await helper.GetRandomString(7);

                var newUrlObject = new Url
                {
                    Id = randomId,
                    LongUrl = url.Url,
                    ShortUrl = $"{http.Request.Scheme}://{http.Request.Host}/{randomId}"
                };

                await context.Urls.AddAsync(newUrlObject);
                await context.SaveChangesAsync();
                return Results.Ok(new UrlShortenResponse
                {
                    ShortenUrl = newUrlObject.ShortUrl
                });
            }).RequireAuthorization();

            //

            app.MapGet("{alias}", async (string alias, ApplicationDbContext context, HttpContext http, IRedisCache cache) =>
            {
                var data = cache.GetData<Url>(alias);
                if (data != null)
                {
                    data.ClickCount++;
                    await context.SaveChangesAsync();
                    return Results.Redirect(data.LongUrl);
                }

                data = await context.Urls.FindAsync(alias);
                if (data == null)
                {
                    return Results.NotFound("لم يتم إجاد المعرف الخاص بالرابط");
                }

                cache.SetData<Url>(alias, data);

                data.ClickCount++;
                await context.SaveChangesAsync();
                return Results.Redirect(data.LongUrl);
            });

            //

            app.MapGet("info", (ClaimsPrincipal claimsPrincipal) =>
            {
                return Results.Ok(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            }).RequireAuthorization();
        }
    }
}
