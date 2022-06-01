
namespace EKrumynas.DTOs.Order
{
    public class PotCartItemSnapshotGetDto
    {
		public int Id { get; set; }
		public string Name { get; set; }
#nullable enable
		public string? Description { get; set; }
#nullable disable

		public string Size { get; set; }
		public string Color { get; set; }

		public int Quantity { get; set; }
		public decimal Price { get; set; }
	}
}
