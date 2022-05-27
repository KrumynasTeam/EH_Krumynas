using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using EKrumynas.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using EKrumynas.Models;
using EKrumynas.Services.Management;
using System.Collections.Generic;

namespace EKrumynas.Controllers.Management
{
	[ApiController]
	[Route("[controller]")]
	[Authorize(Roles = "ADMIN")]
	public class ManageUserController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IManageUserService _manageUserService;

		public ManageUserController(IManageUserService manageUserService, IMapper mapper)
		{
			_manageUserService = manageUserService;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			List<User> users = await _manageUserService.GetAll();

			var response = _mapper.Map<List<UserGetDto>>(users);

			return Ok(response ?? new());
		}

		[HttpGet]
		[Route("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			User user = await _manageUserService.GetById(id);

			var response = _mapper.Map<UserGetDto>(user);

			return Ok(response);
		}

		[HttpGet]
		[Route("Query/{query?}")]
		public async Task<IActionResult> Query(string query)
		{
			List<User> users = await _manageUserService.Query(query);

			var response = _mapper.Map<List<UserGetDto>>(users);

			return Ok(response);
		}

		[HttpPut]
		public async Task<IActionResult> Update(ManageUserUpdateDto userUpdate)
		{
			User updatedUser = await _manageUserService.Update(userUpdate);

			var response = _mapper.Map<UserGetDto>(updatedUser);

			return Ok(response);
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> DeleteById(int id)
		{
			User deletedUser = await _manageUserService.DeleteById(id);

			var response = _mapper.Map<UserGetDto>(deletedUser);

			return Ok(response);
		}
	}
}
