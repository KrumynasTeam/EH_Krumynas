using System;
using EKrumynas.Models;
using EKrumynas.Models.OrderDetails;

namespace EKrumynas.DTOs.Order
{
	public class OrderGetDto
	{
        public int Id { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Status Status { get; set; }
        public Delivery Delivery { get; set; }

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public ShoppingCartSnapshot Cart { get; set; }
    }
}

