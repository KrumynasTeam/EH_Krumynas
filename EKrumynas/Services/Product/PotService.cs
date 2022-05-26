using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public class PotService : IPotService
    {
        private readonly EKrumynasDbContext _context;

        public PotService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<ItemVariants<Product, Pot>> Create(ItemVariants<Product, Pot> pot)
        {
            pot.Item.Type = ProductType.Pot;

            _context.Products.Add(pot.Item);
            await _context.SaveChangesAsync();

            foreach(Pot varient in pot.Variants)
            {
                varient.Product = pot.Item;
                _context.Pots.Add(varient);
            }

            await _context.SaveChangesAsync();

            return pot;
        }

        public async Task<ItemVariants<Product, Pot>> DeleteByProductId(int productId)
        {
            Product found = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (found is null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Product not found.");
            }

            IList<Pot> foundVarients = await _context.Pots
                .Where(p => p.Product.Id == productId)
                .ToArrayAsync();

            _context.Products.Remove(found);

            foreach(Pot varient in foundVarients)
            {
                _context.Pots.Remove(varient);
            }

            await _context.SaveChangesAsync();

            ItemVariants<Product, Pot> variants = new()
            {
                Item = found,
                Variants = foundVarients
            };

            return variants;
        }

        public async Task<IList<Pot>> GetAll()
        {
            return await _context.Pots
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .ToListAsync();
        }

        public async Task<Pot> GetById(int id)
        {
            return await _context.Pots
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ItemVariants<Product, Pot>> Update(ItemVariants<Product, Pot> pot)
        {
            var ids = pot.Variants
                .Select(p => p.Id)
                .ToList();

            List<Pot> oldVariants = await _context.Pots
                .Where(p => p.Product.Id == pot.Item.Id 
                    && !ids.Contains(p.Id))
                .ToListAsync();

            List<ProductImage> oldImages = await _context.ProductImages
                .Where(p => p.ProductId == pot.Item.Id)
                .ToListAsync();

            _context.ProductImages.RemoveRange(oldImages);
            _context.Pots.RemoveRange(oldVariants);

            foreach (var variant in pot.Variants)
            {
                variant.Product = pot.Item;
                if (variant.Id == 0) _context.Pots.Add(variant);
            }
            _context.Products.Update(pot.Item);
            await _context.SaveChangesAsync();
            
            return pot;
        }

        public async Task<IList<ItemVariants<Product, Pot>>> GetAllByProduct()
        {
            IList<Product> products = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Pot)
                .ToListAsync();

            IList<ItemVariants<Product, Pot>> variants = 
                new List<ItemVariants<Product, Pot>>();

            foreach(Product product in products)
            {
                IList<Pot> pots = await _context.Pots
                    .Where(p => p.Product.Id == product.Id)
                    .ToListAsync();

                variants.Add(new ItemVariants<Product, Pot> { 
                    Item = product,
                    Variants = pots
                });
            }

            return variants;
        }

        public async Task<ItemVariants<Product, Pot>> GetByProductId(int id)
        {
            Product product = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Pot)
                .FirstOrDefaultAsync(pr => pr.Id == id);

            IList<Pot> pots = await _context.Pots
                .Where(p => p.Product.Id == id)
                .ToListAsync();

            return new ItemVariants<Product, Pot>()
            {
                Item = product,
                Variants = pots
            };
        }
    }
}
