using System.Collections.Generic;
using EKrumynas.DTOs;
using EKrumynas.Models;

namespace EKrumynas.Services
{
    public interface IProductService
    {
        IList<Product> GetAll();
        Product GetById(int id);
        Product Create(Product product);
        Product Update(Product product);
        Product DeleteById(int id);
    }
}