using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace EKrumynas.Services
{
    public class BouquetService : IBouquetService
    {
        private readonly EKrumynasDbContext _context;

        public BouquetService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public Bouquet Create(Bouquet bouquet)
        {
            Product product = _context.Products
                .FirstOrDefault(x => x.Id == bouquet.Product.Id);

            if (product is null) return null;
            if (product.Type != ProductType.Bouquet) return null;
            bouquet.Product = product;

            _context.Bouquets.Add(bouquet);
            _context.SaveChanges();
            return bouquet;
        }

        public Bouquet DeleteById(int id)
        {
            Bouquet found = _context.Bouquets
                .FirstOrDefault(x => x.Id == id);

            if (found is null) return null;

            _context.Remove(found);
            _context.SaveChanges();
            return found;
        }

        public IList<Bouquet> GetAll()
        {
            return _context.Bouquets
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .Include(b => b.Items)
                    .ThenInclude(i => i.Plant)
                .ToList();
        }

        public Bouquet GetById(int id)
        {
            return _context.Bouquets
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .Include(b => b.Items)
                    .ThenInclude(i => i.Plant)
                .FirstOrDefault(p => p.Id == id);
        }

        public Bouquet Update(Bouquet bouquet)
        {
            throw new System.NotImplementedException();
        }
    }
}
