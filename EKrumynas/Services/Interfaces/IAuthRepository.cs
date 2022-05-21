using System;
using System.Threading.Tasks;
using EKrumynas.Models;

namespace EKrumynas.Services
{
	public interface IAuthRepository
	{
		Task<string> Register(User user, string password);
		Task<string> Login(string username, string password);
		Task<bool> UserExists(string usernameOrEmail);
	}
}

