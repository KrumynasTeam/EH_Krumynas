using System;
using EKrumynas.Models;
using EKrumynas.Models.OrderDetails;

namespace EKrumynas.DTOs.Order
{
	public class OrderGetDto
	{
        public int Id { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string Status { get; set; }
        public string Delivery { get; set; }

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public ShoppingCartSnapshotGetDto Cart { get; set; }
    }
}

