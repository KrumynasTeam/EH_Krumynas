using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using EKrumynas.DTOs.User;
using EKrumynas.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using EKrumynas.Models;

namespace EKrumynas.Controllers
{
	[ApiController]
	[Route("[controller]")]
	[Authorize(Roles = "ADMIN,USER")]
	public class UserController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IUserService _userService;

		public UserController(IUserService userService, IMapper mapper)
		{
			_userService = userService;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			User user = await _userService.Get();

			var response = _mapper.Map<UserGetDto>(user);

			return Ok(response);
		}

		[HttpPut]
		public async Task<IActionResult> Update(UserUpdateDto userUpdate)
		{
			User updatedUser = await _userService.Update(userUpdate);

			var response = _mapper.Map<UserGetDto>(updatedUser);

			return Ok(response);
		}

		[HttpDelete]
		public async Task<IActionResult> Delete()
		{
            User deletedUser = await _userService.Delete();

			var response = _mapper.Map<UserGetDto>(deletedUser);

			return Ok(response);
		}
	}
}

