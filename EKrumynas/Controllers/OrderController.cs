using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.DTOs.Order;
using EKrumynas.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EKrumynas.Controllers
{
	[ApiController]
	[Route("[controller]")]
    [AllowAnonymous]
	public class OrderController : ControllerBase
	{
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet, Authorize(Roles = "ADMIN, USER")]
        public async Task<IList<OrderGetDto>> GetAll()
        {
            var orders = await _orderService.GetAll();

            return orders ?? new List<OrderGetDto>();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<OrderGetDto> GetById(int id)
        {
            var order = await _orderService.GetById(id);

            return order ?? new OrderGetDto();
        }

        [HttpGet, Authorize(Roles = "ADMIN, USER")]
        [Route("User/{id}")]
        public async Task<IList<OrderGetDto>> GetByUserId(int id)
        {
            var order = await _orderService.GetByUserId(id);

            return order ?? new List<OrderGetDto>();
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderAddDto orderAddDto)
        {
            var createdOrder = await _orderService.Create(orderAddDto);

            // TODO: Send email to user about created order

            return Ok(createdOrder);
        }

        [HttpPut, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(OrderUpdateDto orderUpdateDto)
        {
            var updatedOrder = await _orderService.Update(orderUpdateDto);

            // TODO: Send email to user about updated order status

            return Ok(updatedOrder);
        }

        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<OrderGetDto> DeleteById(int id)
        {
            var order = await _orderService.DeleteById(id);

            return order ?? new OrderGetDto();
        }
    }
}

