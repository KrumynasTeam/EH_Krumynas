using EKrumynas.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EKrumynas.Services
{
    public interface IPlantService
    {
        Task<IList<Plant>> GetAll();
        Task<Plant> GetById(int id);
        Task<ItemVariants<Product, Plant>> GetByProductId(int id);
        Task<IList<ItemVariants<Product, Plant>>> GetAllByProduct();
        Task<Plant> Create(Plant plant);
        Task<Plant> Update(Plant plant);
        Task<Plant> DeleteById(int id);
    }
}
