using System;

namespace ShorterUrls.Cache;

public interface IRedisCache
{
    T? GetData<T>(string key);
    void SetData<T>(string key, T data);
}
