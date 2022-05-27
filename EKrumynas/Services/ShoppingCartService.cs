using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using EKrumynas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
            var potCartItem = await _context.PotCartItems.FirstOrDefaultAsync(x => x.Id == cart.Pots.ToList().First().Id);
            cart.Pots.Add(potCartItem);
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

        public async Task<ShoppingCart> DeleteItemById(int cartId, int itemId, ProductType productType)
        {
            var cart = await _context.ShoppingCarts.FirstOrDefaultAsync(x => x.Id == cartId);
            if (cart == null)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }

            switch(productType)
            {
                case ProductType.Plant:
                    cart.Plants.Remove(new() { Id = itemId });
                    break;
                case ProductType.Pot:
                    cart.Pots.Remove(new() { Id = itemId });
                    break;
                case ProductType.Bouquet:
                    cart.Bouquets.Remove(new() { Id = itemId });
                    break;
                default:
                    throw new ApiException(
                        statusCode: 400,
                        message: "Product type not found.");
            }

            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> GetCartById(int id)
        {
            var cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (cart == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Cart not found.");

            return cart;
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, PotCartItem pot)
        {
            ShoppingCart cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Pots.Add(pot);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, PlantCartItem plant)
        {
            ShoppingCart cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Plants.Add(plant);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> UpdateCart(int cartId, BouquetCartItem bouquet)
        {
            ShoppingCart cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            cart.Bouquets.Add(bouquet);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }
    }
}
