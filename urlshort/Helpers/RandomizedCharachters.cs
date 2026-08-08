using System.Text;
using Microsoft.EntityFrameworkCore;
using ShorterUrls.Data;

public class RandomizedCharachters(ApplicationDbContext context)
{
    public async Task<string> GetRandomString(int length)
    {
        while (true)
        {
            const string pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_";

            StringBuilder builder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                char c = pool[Random.Shared.Next(pool.Length)];
                builder.Append(c);
            }

            var id = builder.ToString();
            if(! await context.Urls.AnyAsync(x => x.Id == id))
            {
                return id;
            }
        }
    }
}