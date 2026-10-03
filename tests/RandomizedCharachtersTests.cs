using FluentAssertions;

namespace tests;

public class RandomizedCharachtersTests
{
    [Fact]
    public void GetRandomString_ShouldReturn_StringOfRequestedLength()
    {
        // ARRANGE
        var sut = new RandomizedCharachters();
        // ACT
        var result = sut.GetRandomString(7);
        // ASSERT
        result.Should().HaveLength(7);
        
    }
    [Fact]
    public void GetRandomString_ShouldReturnFalse_StringOfRequestedLength()
    {
        // ARRANGE
        var sut = new RandomizedCharachters();
        // ACT
        var result = sut.GetRandomString(7);
        // ASSERT
        (result.Length == 6).Should().BeFalse();
    }
    [Fact]
    public void GetRandomString_ShouldReturn_True_ifWithinPool()
    {
        // ARRANGE
        string pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$*_";
        var sut = new RandomizedCharachters();
        // ACT
        var result = sut.GetRandomString(7);
        // ASSERT
        result.AsEnumerable().Should().OnlyContain(c => pool.Contains(c));
    }
    [Fact]
    public void GetRandomString_ShouldReturn_stringType()
    {
        // ARRANGE
        var sut = new RandomizedCharachters();
        // ACT
        var result = sut.GetRandomString(7);
        // ASSERT
        result.Should().BeOfType<string>();
    }
}
