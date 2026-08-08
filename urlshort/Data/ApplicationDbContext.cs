using System;
using Microsoft.EntityFrameworkCore;

namespace ShorterUrls.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Url> Urls {get;set;}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Url>(x =>
        {
            x.HasKey(k => k.Id);
            x.Property(p => p.Id)
            .ValueGeneratedNever();
        });
    }
}
