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
            /*User user = _context.Users.FirstOrDefault(u => u.Id == cart.User.Id);

            if (cart == null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Cart not found.");
            }*/

            _context.ShoppingCarts.Add(cart);
            
            await _context.SaveChangesAsync();

            cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                        .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == cart.Id);

            return cart;
        }

        public async Task<ShoppingCart> DeleteById(int id)
        {
            var cart = await _context.ShoppingCarts
                 .Include(x => x.Bouquets)
                     .ThenInclude(x => x.Bouquet.Product)
                         .ThenInclude(x => x.Images)
                 .Include(x => x.Plants)
                     .ThenInclude(x => x.Plant.Product)
                         .ThenInclude(x => x.Images)
                 .Include(x => x.Pots)
                     .ThenInclude(x => x.Pot.Product)
                         .ThenInclude(x => x.Images)
                 .FirstOrDefaultAsync(p => p.Id == id);

            if (cart == null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Cart not found.");
            }

            _context.Remove(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> DeleteItemById(int cartId, int itemId, ProductType productType)
        {
            var cart = await _context.ShoppingCarts
                 .Include(x => x.Bouquets)
                     .ThenInclude(x => x.Bouquet.Product)
                         .ThenInclude(x => x.Images)
                 .Include(x => x.Plants)
                     .ThenInclude(x => x.Plant.Product)
                         .ThenInclude(x => x.Images)
                 .Include(x => x.Pots)
                     .ThenInclude(x => x.Pot.Product)
                         .ThenInclude(x => x.Images)
                 .FirstOrDefaultAsync(p => p.Id == cartId);

            if (cart == null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Cart not found.");
            }

            switch(productType)
            {
                case ProductType.Plant:
                    var plant = await _context.PlantCartItems
                        .FirstOrDefaultAsync(x => x.Id == itemId);

                    if (plant == null)
                    {
                        throw new ApiException(
                           statusCode: 404,
                           message: "Pot not found.");
                    }

                    _context.PlantCartItems.Remove(plant);
                    break;
                case ProductType.Pot:
                    var pot = await _context.PotCartItems
                        .FirstOrDefaultAsync(x => x.Id == itemId);

                    if (pot == null)
                    {
                        throw new ApiException(
                           statusCode: 404,
                           message: "Pot not found.");
                    }

                    _context.PotCartItems.Remove(pot);
                    break;
                case ProductType.Bouquet:
                    var bouquet = await _context.BouquetCartItems
                        .FirstOrDefaultAsync(x => x.Id == itemId);

                    if (bouquet == null)
                    {
                        throw new ApiException(
                           statusCode: 404,
                           message: "Pot not found.");
                    }

                    _context.BouquetCartItems.Remove(bouquet);
                    break;
                default:
                    throw new ApiException(
                        statusCode: 400,
                        message: "Product type does not exist.");
            }

            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> GetCartById(int id)
        {
            var cart = await _context.ShoppingCarts
                .Include(x => x.Bouquets)
                    .ThenInclude(x => x.Bouquet.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                        .ThenInclude(x => x.Images)
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
                        .ThenInclude(x => x.Images)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                        .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            if (cart == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Cart not found.");

            Pot addedPot = await _context.Pots
                .Include(x => x.Product)
                    .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == pot.PotId);

            if (addedPot == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Pot not found.");

            pot.Pot = addedPot;
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
                        .ThenInclude(x => x.Images)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                        .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            if (cart == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Cart not found.");

            Plant addedPlant = await _context.Plants
                .Include(x => x.Product)
                    .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == plant.PlantId);

            if (addedPlant == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Plant not found.");

            plant.Plant = addedPlant;
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
                        .ThenInclude(x => x.Images)
                .Include(x => x.Plants)
                    .ThenInclude(x => x.Plant.Product)
                        .ThenInclude(x => x.Images)
                .Include(x => x.Pots)
                    .ThenInclude(x => x.Pot.Product)
                        .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(p => p.Id == cartId);

            if (cart == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Cart not found.");

            Bouquet addedBouquet = await _context.Bouquets
                .Include(x => x.Product)
                    .ThenInclude(x => x.Images)
                .FirstOrDefaultAsync(b => b.Id == bouquet.BouquetId);

            if (addedBouquet == null)
                throw new ApiException(
                        statusCode: 404,
                        message: "Bouquet not found.");

            bouquet.Bouquet = addedBouquet;
            cart.Bouquets.Add(bouquet);
            _context.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }
    }
}
