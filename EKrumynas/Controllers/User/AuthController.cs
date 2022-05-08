using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using EKrumynas.Services;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using EKrumynas.DTOs.User;

namespace EKrumynas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            string response = await _authRepository.Register(
                new User {
                    Email = request.Email,
                    Username = request.Username,
                    FirstName = request.FirstName,
                    LastName = request.LastName
                }, request.Password
            );
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDto request)
        {
            string response = await _authRepository.Login(
                request.UsernameOrEmail, request.Password
            );
            return Ok(response);
        }
    }
}

