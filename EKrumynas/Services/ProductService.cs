using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.DTOs;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Services
{

    public class ProductService : IProductService
    {
        private readonly EKrumynasDbContext _context;

        public ProductService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<Product> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> DeleteById(int id)
        {
            Product found = await _context.Products
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

        public async Task<IList<Product>> GetAll()
        {
            return await _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            return await _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> Update(Product product)
        {
            throw new NotImplementedException();
        }
    }
}