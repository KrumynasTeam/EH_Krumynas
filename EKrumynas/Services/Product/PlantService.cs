﻿using AutoMapper;
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
    public class PlantService : IPlantService
    {
        private readonly EKrumynasDbContext _context;

        public PlantService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<Plant> Create(Plant plant)
        {
            Product product = await _context.Products
                .Include(p => p.Discount)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == plant.Product.Id);

            if (product is null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product not found.");
            }

            if (product.Type != ProductType.Plant)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Product should be of plant type");
            }

            plant.Product = product;

            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();

            return plant;
        }

        public async Task<Plant> DeleteById(int id)
        {
            Plant found = await _context.Plants
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

        public async Task<Plant> Update(Plant plant)
        {
            _context.Update(plant);
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