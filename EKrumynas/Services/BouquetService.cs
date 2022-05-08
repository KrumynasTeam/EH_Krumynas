using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task<Bouquet> Create(Bouquet bouquet)
        {
            Product product = await _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == bouquet.Product.Id);

            if (product is null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product not found.");
            }

            if (product.Type != ProductType.Bouquet)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product should be of bouquet type");
            }

            bouquet.Product = product;

            _context.Bouquets.Add(bouquet);
            await _context.SaveChangesAsync();

            return bouquet;
        }

        public async Task<Bouquet> DeleteById(int id)
        {
            Bouquet found = await _context.Bouquets
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

        public async Task<Bouquet> Update(Bouquet bouquet)
        {
            throw new System.NotImplementedException();
        }
    }
}
