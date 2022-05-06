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

        public Task<Pot> Update(Pot pot)
        {
            throw new System.NotImplementedException();
        }
    }
}
