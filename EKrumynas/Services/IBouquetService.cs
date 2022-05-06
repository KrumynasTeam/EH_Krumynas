using EKrumynas.Models;
using System.Collections.Generic;

namespace EKrumynas.Services
{
    public interface IBouquetService
    {
        IList<Bouquet> GetAll();
        Bouquet GetById(int id);
        Bouquet Create(Bouquet bouquet);
        Bouquet Update(Bouquet bouquet);
        Bouquet DeleteById(int id);

    }
}
