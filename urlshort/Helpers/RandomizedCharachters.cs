using System.Text;

public class RandomizedCharachters()
{
    public string GetRandomString(int length)
    {
        const string pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$*_";

        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            char c = pool[Random.Shared.Next(pool.Length)];
            builder.Append(c);
        }

        var id = builder.ToString();
        return id;
    }
}