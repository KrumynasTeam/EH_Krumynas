using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public class BouquetService : IBouquetService
    {
        private readonly EKrumynasDbContext _context;

        public BouquetService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<ItemVariants<Product, Bouquet>> Create(ItemVariants<Product, Bouquet> bouquet)
        {
            bouquet.Item.Type = ProductType.Bouquet;

            _context.Products.Add(bouquet.Item);
            await _context.SaveChangesAsync();

            foreach (Bouquet varient in bouquet.Variants)
            {
                varient.Product = bouquet.Item;
                _context.Bouquets.Add(varient);
            }

            await _context.SaveChangesAsync();

            return bouquet;
        }

        public async Task<ItemVariants<Product, Bouquet>> DeleteByProductId(int productId)
        {
            Product found = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (found is null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Product not found.");
            }

            IList<Bouquet> foundVarients = await _context.Bouquets
                .Where(p => p.Product.Id == productId)
                .ToArrayAsync();

            _context.Products.Remove(found);

            foreach (Bouquet varient in foundVarients)
            {
                _context.Bouquets.Remove(varient);
            }

            await _context.SaveChangesAsync();

            ItemVariants<Product, Bouquet> variants = new()
            {
                Item = found,
                Variants = foundVarients
            };

            return variants;
        }

        public async Task<IList<Bouquet>> GetAll()
        {
            return await _context.Bouquets
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .Include(b => b.Items)
                .ToListAsync();
        }

        public async Task<Bouquet> GetById(int id)
        {
            return await _context.Bouquets
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .Include(b => b.Items)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ItemVariants<Product, Bouquet>> Update(ItemVariants<Product, Bouquet> bouquet)
        {
            var ids = bouquet.Variants
                .Select(p => p.Id)
                .ToList();

            List<Bouquet> oldVariants = await _context.Bouquets
                .Where(p => p.Product.Id == bouquet.Item.Id
                    && !ids.Contains(p.Id))
                .ToListAsync();

            List<ProductImage> oldImages = await _context.ProductImages
                .Where(p => p.ProductId == bouquet.Item.Id)
                .ToListAsync();

            _context.ProductImages.RemoveRange(oldImages);
            _context.Bouquets.RemoveRange(oldVariants);

            foreach (var variant in bouquet.Variants)
            {
                variant.Product = bouquet.Item;
                if (variant.Id == 0) _context.Bouquets.Add(variant);
            }
            _context.Products.Update(bouquet.Item);
            await _context.SaveChangesAsync();

            return bouquet;
        }

        public async Task<IList<ItemVariants<Product, Bouquet>>> GetAllByProduct()
        {
            IList<Product> products = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Bouquet)
                .ToListAsync();

            IList<ItemVariants<Product, Bouquet>> variants =
                new List<ItemVariants<Product, Bouquet>>();

            foreach (Product product in products)
            {
                IList<Bouquet> bouquets = await _context.Bouquets
                    .Include(b => b.Items)
                    .Where(b => b.Product.Id == product.Id)
                    .ToListAsync();

                variants.Add(new ItemVariants<Product, Bouquet>
                {
                    Item = product,
                    Variants = bouquets
                });
            }

            return variants;
        }

        public async Task<ItemVariants<Product, Bouquet>> GetByProductId(int id)
        {
            Product product = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Bouquet)
                .FirstOrDefaultAsync(pr => pr.Id == id);

            IList<Bouquet> bouquets = await _context.Bouquets
                .Include(b => b.Items)
                .Where(b => b.Product.Id == id)
                .ToListAsync();

            return new ItemVariants<Product, Bouquet>()
            {
                Item = product,
                Variants = bouquets
            };
        }
    }
}
