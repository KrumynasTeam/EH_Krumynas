using EKrumynas.Models;
using EKrumynas.Models.Middleware;
using EKrumynas.Models.OrderDetails;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Data
{
    public class EKrumynasDbContext : DbContext
    {
        public EKrumynasDbContext(DbContextOptions<EKrumynasDbContext> options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Bouquet> Bouquets { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Pot> Pots { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<PlantCartItem> PlantCartItems { get; set; }
        public DbSet<PotCartItem> PotCartItems { get; set; }
        public DbSet<BouquetCartItem> BouquetCartItems { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ActivityRecord> ActivityRecords { get; set; }

        public DbSet<ShoppingCartSnapshot> ShoppingCartSnapshot { get; set; }
        public DbSet<BouquetCartItemSnapshot> BouquetCartItemSnapshots { get; set; }
        public DbSet<PlantCartItemSnapshot> PlantCartItemSnapshots{ get; set; }
        public DbSet<PotCartItemSnapshot> PotCartItemSnapshot { get; set; }
    }
}