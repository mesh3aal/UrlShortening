public record urlshortenRequest
{
    public string Url {get;set;} = null!;
    public string? Alias {get;set;}
}