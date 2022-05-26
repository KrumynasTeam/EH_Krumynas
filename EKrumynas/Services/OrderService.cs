using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.DTOs.Order;
using EKrumynas.Models;
using EKrumynas.Models.OrderDetails;
using EKrumynas.Services.Interfaces;
using EKrumynas.Services.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Services
{
	public class OrderService : IOrderService
	{
        private readonly IMapper _mapper;
        private readonly EKrumynasDbContext _context;
        private readonly UserSession _userSession;

        public OrderService(EKrumynasDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userSession = new UserSession(httpContextAccessor);
        }

        public async Task<IList<OrderGetDto>> GetAll()
        {
            var orders = await _context.Orders
                .Include(o => o.Cart)
                .ToListAsync();

            return _mapper.Map<List<OrderGetDto>>(orders);
        }

        public async Task<OrderGetDto> GetById(int id)
        {
            int? userId = null;
            try
            {
                userId = _userSession.UserId;
            }
            catch (Exception) { }

            var foundOrder = await _context.Orders
                .Include(x => x.User)
                .Include(x => x.Cart)
                .FirstOrDefaultAsync(x => x.User.Id == userId && x.Id == id);

            return _mapper.Map<OrderGetDto>(foundOrder);
        }

        public async Task<IList<OrderGetDto>> GetByUserId(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.Cart)
                .Include(o => o.User)
                .Where(x => x.User.Id == userId)
                .ToListAsync();

            return _mapper.Map<List<OrderGetDto>>(orders);
        }

        public async Task<OrderGetDto> Create(OrderAddDto orderAddDto)
        {
            var shoppingCart = await _context.ShoppingCarts.FirstOrDefaultAsync(x => x.Id == orderAddDto.CartId);

            if (shoppingCart == null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Shopping cart not found.");
            }

            int? userId = null;

            try {
                userId = _userSession.UserId;
            } catch (Exception) {}

            var cartSnapshot = _mapper.Map<ShoppingCartSnapshot>(shoppingCart);
            User orderUser = null;

            if (userId != null)
            {
                orderUser = _context.Users.FirstOrDefault(x => x.Id == userId);
            }
            else
            {
                orderUser = null;
            }

            decimal bouquetsTotal = cartSnapshot.Bouquets.Sum(item => item.Price);
            decimal plantsTotal = cartSnapshot.Plants.Sum(item => item.Price);
            decimal potsTotal = cartSnapshot.Pots.Sum(item => item.Price);

            decimal total = bouquetsTotal + plantsTotal + potsTotal;

            var newOrder = new Order
            {
                Cart = cartSnapshot,
                Total = total,
                CreatedAt = DateTime.UtcNow,
                Status = Status.Ordered,
                Delivery = orderAddDto.Delivery,
                Country = (orderAddDto?.Country) ?? (orderUser?.Country),
                Street = (orderAddDto?.Street) ?? (orderUser?.Street),
                AddressLine1 = (orderAddDto?.AddressLine1) ?? (orderUser?.AddressLine1),
                AddressLine2 = (orderAddDto?.AddressLine2) ?? (orderUser?.AddressLine2),
                User = orderUser
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return _mapper.Map<OrderGetDto>(newOrder);
        }

        public async Task<OrderGetDto> Update(OrderUpdateDto orderUpdateDto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == orderUpdateDto.Id);

            if (order == null)
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Order not found.");
            }

            order.Status = orderUpdateDto.Status;

            _context.Add(order);
            await _context.SaveChangesAsync();

            return _mapper.Map<OrderGetDto>(order);
        }

        public async Task<OrderGetDto> DeleteById(int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);

            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<OrderGetDto>(order);
        }
    }
}
