using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.DTOs.User;
using EKrumynas.Models;

namespace EKrumynas.Services.Management
{
	public interface IManageUserService
	{
        Task<List<User>> GetAll();
        Task<User> GetById(int id);
        Task<List<User>> Query(string username);
        Task<User> Update(ManageUserUpdateDto user);
        Task<User> DeleteById(int id);
    }
}
