using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public class PlantService : IPlantService
    {
        private readonly EKrumynasDbContext _context;

        public PlantService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<ItemVariants<Product, Plant>> Create(ItemVariants<Product, Plant> plant)
        {
            plant.Item.Type = ProductType.Plant;

            _context.Products.Add(plant.Item);
            await _context.SaveChangesAsync();

            foreach (Plant varient in plant.Variants)
            {
                varient.Product = plant.Item;
                _context.Plants.Add(varient);
            }

            await _context.SaveChangesAsync();

            return plant;
        }

        public async Task<ItemVariants<Product, Plant>> DeleteByProductId(int productId)
        {
            Product found = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (found is null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Product not found.");
            }

            IList<Plant> foundVarients = await _context.Plants
                .Where(p => p.Product.Id == productId)
                .ToArrayAsync();

            _context.Products.Remove(found);

            foreach (Plant varient in foundVarients)
            {
                _context.Plants.Remove(varient);
            }

            await _context.SaveChangesAsync();

            ItemVariants<Product, Plant> variants = new()
            {
                Item = found,
                Variants = foundVarients
            };

            return variants;
        }

        public async Task<IList<Plant>> GetAll()
        {
            return await _context.Plants
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .ToListAsync();
        }

        public async Task<Plant> GetById(int id)
        {
            return await _context.Plants
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ItemVariants<Product, Plant>> Update(ItemVariants<Product, Plant> plant)
        {
            var ids = plant.Variants
                .Select(p => p.Id)
                .ToList();

            List<Plant> oldVariants = await _context.Plants
                .Where(p => p.Product.Id == plant.Item.Id
                    && !ids.Contains(p.Id))
                .ToListAsync();

            List<ProductImage> oldImages = await _context.ProductImages
                .Where(p => p.ProductId == plant.Item.Id)
                .ToListAsync();

            _context.ProductImages.RemoveRange(oldImages);
            _context.Plants.RemoveRange(oldVariants);

            foreach (var variant in plant.Variants)
            {
                variant.Product = plant.Item;
                if (variant.Id == 0) _context.Plants.Add(variant);
            }
            _context.Products.Update(plant.Item);
            await _context.SaveChangesAsync();

            return plant;
        }

        public async Task<IList<ItemVariants<Product, Plant>>> GetAllByProduct()
        {
            IList<Product> products = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Plant)
                .ToListAsync();

            IList<ItemVariants<Product, Plant>> variants =
                new List<ItemVariants<Product, Plant>>();

            foreach (Product product in products)
            {
                IList<Plant> plants = await _context.Plants
                    .Where(p => p.Product.Id == product.Id)
                    .ToListAsync();

                variants.Add(new ItemVariants<Product, Plant>
                {
                    Item = product,
                    Variants = plants
                });
            }

            return variants;
        }

        public async Task<ItemVariants<Product, Plant>> GetByProductId(int id)
        {
            Product product = await _context.Products
                .Include(pr => pr.Discount)
                .Include(pr => pr.Images)
                .Where(pr => pr.Type == ProductType.Plant)
                .FirstOrDefaultAsync(pr => pr.Id == id);

            IList<Plant> plants = await _context.Plants
                .Where(p => p.Product.Id == id)
                .ToListAsync();

            return new ItemVariants<Product, Plant>()
            {
                Item = product,
                Variants = plants
            };
        }
    }
}
