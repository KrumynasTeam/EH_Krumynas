using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models.OrderDetails
{
	public class PotCartItemSnapshot
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		#nullable enable
		public string? Description { get; set; }
		#nullable disable

		public PotSize Size { get; set; }
		public ProductColor Color { get; set; }

		public int Quantity { get; set; }
		public decimal Price { get; set; }

		public virtual ShoppingCartSnapshot Cart { get; set; }
	}
}
