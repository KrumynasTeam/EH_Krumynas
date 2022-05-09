using AutoMapper;
using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.DTOs;
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

        public async Task<Pot> Create(Pot pot)
        {
            Product product = await _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == pot.Product.Id);

            if (product is null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product not found.");
            }

            if (product.Type != ProductType.Pot)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product should be of pot type");
            }

            pot.Product = product;

            _context.Pots.Add(pot);
            await _context.SaveChangesAsync();

            return pot;
        }

        public async Task<Pot> DeleteById(int id)
        {
            Pot found = await _context.Pots
                .FirstOrDefaultAsync(x => x.Id == id);

            if (found is null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product not found.");
            }

            _context.Remove(found);
            await _context.SaveChangesAsync();

            return found;
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

        public async Task<Pot> Update(Pot pot)
        {
            _context.Update(pot);
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
