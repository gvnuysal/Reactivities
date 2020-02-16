using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
       public DbSet<Value> Values { get; set; }
public DbSet<Deneme> Denemes { get; set; }
       /* protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>().HasData(new Value
            {
                Id = 1,
                Name = "Güven Uysal"
            },new Value
            {
                Id = 2,
                Name = "Tuncay Kurt"
            },new Value
            {
                Id = 3,
                Name = "Alparslan Şen"
            },new Value
            {
                Id = 4,
                Name = "Özgür Yurtseven"
            });
        }*/
    }
}
