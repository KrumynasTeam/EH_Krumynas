using EKrumynas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public interface IBouquetService
    {
        Task<IList<Bouquet>> GetAll();
        Task<ItemVariants<Product, Bouquet>> GetByProductId(int id);
        Task<IList<ItemVariants<Product, Bouquet>>> GetAllByProduct();
        Task<Bouquet> GetById(int id);
        Task<ItemVariants<Product, Bouquet>> Create(ItemVariants<Product, Bouquet> bouquet);
        Task<ItemVariants<Product, Bouquet>> Update(ItemVariants<Product, Bouquet> bouquet);
        Task<ItemVariants<Product, Bouquet>> DeleteByProductId(int productId);

    }
}
