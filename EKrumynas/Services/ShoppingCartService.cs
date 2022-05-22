using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using EKrumynas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly EKrumynasDbContext _context;

        public ShoppingCartService(EKrumynasDbContext context)
        {
            _context = context;
        }
        public async Task<ShoppingCart> CreateCart(ShoppingCart cart)
        {
            _context.ShoppingCarts.Add(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> DeleteById(int id)
        {
            ShoppingCart found = await _context.ShoppingCarts
                .FirstOrDefaultAsync(x => x.Id == id);
            if (found == null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }

            _context.Remove(found);
            await _context.SaveChangesAsync();

            return found;
        }

        public Task<ShoppingCart> DeleteItemById(int cartId, int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<ShoppingCart>> GetAll()
        {
            return await _context.ShoppingCarts.ToListAsync();
        }

        public async Task<ShoppingCart> GetCartById(int id)
        {
            return await _context.ShoppingCarts.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IList<ShoppingCart>> GetCartByStatus(string status)
        {
            return await _context.ShoppingCarts
                .Include(s => s.Status == (CartStatus)Enum.Parse(typeof(CartStatus), status))
                .ToListAsync();
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, PotCartItem pot)
        {
            ShoppingCart cart = await _context.ShoppingCarts.FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Pots.Add(pot);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, PlantCartItem plant)
        {
            ShoppingCart cart = await _context.ShoppingCarts
                .Include(p => p.Plants)
                    .ThenInclude(plq => plq.Quantity)
                .Include(p => p.Pots)
                    .ThenInclude(pq => pq.Quantity)
                .Include(p => p.Bouquets)
                    .ThenInclude(bq => bq.Quantity)
                .Include(s => s.Status)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Plants.Add(plant);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, BouquetCartItem bouquet)
        {
            ShoppingCart cart = await _context.ShoppingCarts.FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Bouquets.Add(bouquet);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> UpdateCartStatus(int cartId, string status)
        {
            ShoppingCart cart = await _context.ShoppingCarts.FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Status = (CartStatus)Enum.Parse(typeof(CartStatus), status);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }
    }
}
