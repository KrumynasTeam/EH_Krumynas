using System.Threading.Tasks;
using EKrumynas.DTOs.User;
using EKrumynas.Models;

namespace EKrumynas.Services.UserService
{
    public interface IUserService
    {
        Task<User> Get();
        Task<User> Update(UserUpdateDto user);
        Task<User> Delete();
    }
}

