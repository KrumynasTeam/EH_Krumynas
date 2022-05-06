using EKrumynas.Models;
using System.Collections.Generic;

namespace EKrumynas.Services
{
    public interface IPlantService
    {
        IList<Plant> GetAll();
        Plant GetById(int id);
        Plant Create(Plant plant);
        Plant Update(Plant plant);
        Plant DeleteById(int id);
    }
}
