using System;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace ShorterUrls.Cache;

public class RedisCache(IDistributedCache cache) : IRedisCache
{
    public T? GetData<T>(string key)
    {
        var data = cache.GetString(key);

        if(data == null) return default;

        return JsonSerializer.Deserialize<T>(data);
    }

    public void SetData<T>(string key, T data)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        };
        cache.SetString(key, JsonSerializer.Serialize(data), options);
    }
}
