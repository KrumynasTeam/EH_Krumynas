using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using EKrumynas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
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
            throw new System.NotImplementedException();
        }

        public async Task<IList<ShoppingCart>> GetAll()
        {
            return await _context.ShoppingCarts.ToListAsync();
        }

        public Task<ShoppingCart> GetCartById(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<ShoppingCart> UpdateCart(int cartId, ShoppingCartItem cart)
        {
            throw new System.NotImplementedException();
        }
    }
}
