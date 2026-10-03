var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres").WithDataVolume().AddDatabase("urlshortening");
var cache = builder.AddRedis("mycache").WithDataVolume();

var keycloak = builder.AddKeycloak("keycloak", 8080).WithDataVolume();

builder.AddProject<Projects.urlshort>("urlshort")
    .WithReference(postgres)
    .WithReference(cache)
    .WithReference(keycloak)
    .WaitFor(postgres)
    .WaitFor(cache)
    .WaitFor(keycloak)
    .WithUrls(context =>
    {
        context.Urls.Add(new()
        {
            Url = "/docs",
            DisplayText = "API Docs",
            Endpoint = context.GetEndpoint("https")
        });
    });

if (builder.ExecutionContext.IsRunMode)
{
    keycloak.WithRealmImport("./realms");
}

builder.Build().Run();
