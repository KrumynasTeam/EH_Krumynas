using System.Collections.Generic;
using EKrumynas.Models;

namespace EKrumynas.Services
{
    public interface IProductService
    {
        IList<Product> GetAll();
    }
}