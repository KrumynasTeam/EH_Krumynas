using AutoMapper;
using EKrumynas.Data;
using EKrumynas.DTOs;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace EKrumynas.Services
{
    public class PotService : IPotService
    {
        private readonly EKrumynasDbContext _context;

        public PotService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public Pot Create(Pot pot)
        {
            Product product = _context.Products
                .FirstOrDefault(x => x.Id == pot.Product.Id);

            if (product is null) return null;
            if(product.Type != ProductType.Pot) return null;
            pot.Product = product;

            _context.Pots.Add(pot);
            _context.SaveChanges();
            return pot;
        }

        public Pot DeleteById(int id)
        {
            Pot found = _context.Pots.FirstOrDefault(x => x.Id == id);
            if(found is null) return null;

            _context.Remove(found);
            _context.SaveChanges();
            return found;
        }

        public IList<Pot> GetAll()
        {
            return _context.Pots
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .ToList();
        }

        public Pot GetById(int id)
        {
            return _context.Pots
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .FirstOrDefault(p => p.Id == id);
        }

        public Pot Update(Pot pot)
        {
            throw new System.NotImplementedException();
        }
    }
}
