namespace urlshort.Dtos
{
    public sealed record UserUrlsRepsonse
    {
        public string Shorturl { get; init; } = default!;
        public string Longurl { get; init; } = default!;

    }
}
