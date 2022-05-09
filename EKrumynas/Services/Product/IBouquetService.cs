using EKrumynas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public interface IBouquetService
    {
        Task<IList<Bouquet>> GetAll();
        Task<Bouquet> GetById(int id);
        Task<ItemVariants<Product, Bouquet>> GetByProductId(int id);
        Task<IList<ItemVariants<Product, Bouquet>>> GetAllByProduct();
        Task<Bouquet> Create(Bouquet bouquet);
        Task<Bouquet> Update(Bouquet bouquet);
        Task<Bouquet> DeleteById(int id);

    }
}
