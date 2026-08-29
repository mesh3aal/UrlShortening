using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.Caching.Distributed;
using Moq;
using ShorterUrls.Cache;

namespace tests;

public class RedisCacheTests
{
    [Fact]
    public void GetData_WhenKeyExists_ShouldReturnDeserializedObject()
    {
        // Given
        var expected = new Url
        {
            Id = "abc1234",
            LongUrl = "https://example.com",
            ShortUrl = "https://short.ly/abc1234"
        };

        var json = JsonSerializer.Serialize(expected);
        var bytes = Encoding.UTF8.GetBytes(json);

        var stub = new Mock<IDistributedCache>();
        stub.Setup(x => x.Get("key")).Returns(bytes);

        var sut = new RedisCache(stub.Object);

        // When
        var result = sut.GetData<Url>("key");

        // Then
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void GetData_WhenKeyDoesNotExist_ShouldReturnDefault()
    {
        // Given
        var stub = new Mock<IDistributedCache>();
        stub.Setup(x => x.Get("missing_key")).Returns((byte[]?)null);

        var sut = new RedisCache(stub.Object);

        // When
        var result = sut.GetData<Url>("missing_key");

        // Then
        result.Should().BeNull();
    }

    [Fact]
    public void SetData_WhenCalled_ShouldSerializeAndStoreInCacheWithExpiration()
    {
        // Given
        var stub = new Mock<IDistributedCache>();
        var sut = new RedisCache(stub.Object);

        var data = new Url
        {
            Id = "abc1234",
            LongUrl = "https://example.com",
            ShortUrl = "https://short.ly/abc1234"
        };
        var expectedJson = JsonSerializer.Serialize(data);

        // When
        sut.SetData("key", data);

        // Then
        stub.Verify(x => x.Set(
            "key",
            It.Is<byte[]>(b => Encoding.UTF8.GetString(b) == expectedJson),
            It.Is<DistributedCacheEntryOptions>(opt => opt.AbsoluteExpirationRelativeToNow == TimeSpan.FromMinutes(5))
        ), Times.Once);
    }
}

