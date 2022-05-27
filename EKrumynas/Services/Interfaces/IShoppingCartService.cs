using EKrumynas.Models;
using System.Threading.Tasks;

namespace EKrumynas.Services.Interfaces
{
    public interface IShoppingCartService
    {
        Task<ShoppingCart> GetCartById(int id);
        Task<ShoppingCart> CreateCart(ShoppingCart cart);
        Task<ShoppingCart> UpdateCart(int cartId, PotCartItem pot);
        Task<ShoppingCart> UpdateCart(int cartId, PlantCartItem plant);
        Task<ShoppingCart> UpdateCart(int cartId, BouquetCartItem bouquet);
        Task<ShoppingCart> DeleteById(int id);
        Task<ShoppingCart> DeleteItemById(int cartId, int itemId, ProductType productType);
    }
}
