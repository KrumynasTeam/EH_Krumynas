using EKrumynas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services.Interfaces
{
    public interface IShoppingCartService
    {
        Task<IList<ShoppingCart>> GetAll();
        Task<ShoppingCart> GetCartById(int id);
        Task<IList<ShoppingCart>> GetCartByStatus(string status);
        Task<ShoppingCart> CreateCart(ShoppingCart cart);
        Task<ShoppingCart> UpdateCart(int cartId, PotCartItem pot);
        Task<ShoppingCart> UpdateCart(int cartId, PlantCartItem plant);
        Task<ShoppingCart> UpdateCart(int cartId, BouquetCartItem bouquet);
        Task<ShoppingCart> UpdateCartStatus (int cartId, int status);
        Task<ShoppingCart> DeleteById(int id);
        Task<ShoppingCart> DeleteItemById(int cartId, string id);
    }
}
