public class Url()
{
    public string Id {get;set;} = null!;
    public Guid KeyCloackId { get; set; }
    public required string LongUrl {get;set;} = null!;
    public required string ShortUrl {get;set;} = null!;
    public int ClickCount {get;set;} = 0;
}