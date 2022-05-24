using EKrumynas.Models;

namespace EKrumynas.DTOs.Order
{
	public class OrderAddDto
	{
        public int CartId { get; set; }
        public Delivery Delivery { get; set; }
        #nullable enable
        public string? Country { get; set; }
        public string? Street { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
    }
}

