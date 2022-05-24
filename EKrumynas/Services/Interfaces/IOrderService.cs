using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.DTOs.Order;

namespace EKrumynas.Services.Interfaces
{
	public interface IOrderService
	{
		Task<IList<OrderGetDto>> GetAll();
		Task<OrderGetDto> GetById(int id);
		Task<IList<OrderGetDto>> GetByUserId(int userId);
		Task<OrderGetDto> Create(OrderAddDto orderAddDto);
		Task<OrderGetDto> Update(OrderUpdateDto orderUpdateDto);
		Task<OrderGetDto> DeleteById(int id);
	}
}
