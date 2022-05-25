using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models.OrderDetails
{
	public class BouquetCartItemSnapshot
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		#nullable enable
		public string? Description { get; set; }
		#nullable disable

		public int Quantity { get; set; }
		public decimal Price { get; set; }

		public virtual ShoppingCartSnapshot Cart { get; set; }
	}
}
