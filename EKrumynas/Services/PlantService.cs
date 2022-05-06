using AutoMapper;
using EKrumynas.Data;
using EKrumynas.DTOs;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace EKrumynas.Services
{
    public class PlantService : IPlantService
    {
        private readonly EKrumynasDbContext _context;

        public PlantService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public Plant Create(Plant plant)
        {
            Product product = _context.Products
                .FirstOrDefault(x => x.Id == plant.Product.Id);

            if (product is null) return null;
            if (product.Type != ProductType.Plant) return null;
            plant.Product = product;

            _context.Plants.Add(plant);
            _context.SaveChanges();
            return plant;
        }

        public Plant DeleteById(int id)
        {
            Plant found = _context.Plants.FirstOrDefault(x => x.Id == id);
            if (found is null) return null;

            _context.Remove(found);
            _context.SaveChanges();
            return found;
        }

        public IList<Plant> GetAll()
        {
            return _context.Plants
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .ToList();
        }

        public Plant GetById(int id)
        {
            return _context.Plants
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Discount)
                .Include(p => p.Product)
                    .ThenInclude(pr => pr.Images)
                .FirstOrDefault(p => p.Id == id);
        }

        public Plant Update(Plant plant)
        {
            throw new System.NotImplementedException();
        }
    }
}
