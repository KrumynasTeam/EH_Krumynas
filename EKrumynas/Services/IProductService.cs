using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.DTOs;
using EKrumynas.Models;

namespace EKrumynas.Services
{
    public interface IProductService
    {
        Task<IList<Product>> GetAll();
        Task<Product> GetById(int id);
        Task<Product> Create(Product product);
        Task<Product> Update(Product product);
        Task<Product> DeleteById(int id);
    }
}