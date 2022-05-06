using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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

        public Product Create(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public Product DeleteById(int id)
        {
            Product found = _context.Products.FirstOrDefault(x => x.Id == id);
            if (found is null) return null;

            _context.Remove(found);
            _context.SaveChanges();
            return found;
        }

        public IList<Product> GetAll()
        {
            return _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .ToList();
        }

        public Product GetById(int id)
        {
            return _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .FirstOrDefault(p => p.Id == id);
        }

        public Product Update(Product product)
        {
            throw new NotImplementedException();
        }
    }
}