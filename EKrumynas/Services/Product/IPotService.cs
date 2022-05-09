using EKrumynas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public interface IPotService
    {
        Task<IList<Pot>> GetAll();
        Task<Pot> GetById(int id);
        Task<ItemVariants<Product, Pot>> GetByProductId(int id);
        Task<IList<ItemVariants<Product, Pot>>> GetAllByProduct();
        Task<Pot> Create(Pot pot);
        Task<Pot> Update(Pot pot);
        Task<Pot> DeleteById(int id);
    }
}
