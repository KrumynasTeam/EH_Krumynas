using System;
using System.Collections.Generic;
using System.Linq;
using EKrumynas.Data;
using EKrumynas.Models;

namespace EKrumynas.Services
{

    public class ProductService : IProductService
    {
        private readonly EKrumynasDbContext _context;

        public ProductService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public IList<Product> GetAll()
        {
            return _context.Products.ToList();
        }
    }
}