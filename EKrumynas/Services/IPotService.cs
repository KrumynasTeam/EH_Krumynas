using EKrumynas.Models;
using System.Collections.Generic;

namespace EKrumynas.Services
{
    public interface IPotService
    {
        IList<Pot> GetAll();
        Pot GetById(int id);
        Pot Create(Pot pot);
        Pot Update(Pot pot);
        Pot DeleteById(int id);
    }
}
