using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Data
{
    public class EKrumynasDbContext : DbContext
    {
        public EKrumynasDbContext(DbContextOptions<EKrumynasDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}