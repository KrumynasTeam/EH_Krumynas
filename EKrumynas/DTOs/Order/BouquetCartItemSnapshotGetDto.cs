namespace EKrumynas.DTOs.Order
{
    public class BouquetCartItemSnapshotGetDto
    {
		public int Id { get; set; }
		public string Name { get; set; }
#nullable enable
		public string? Description { get; set; }
#nullable disable

		public int Quantity { get; set; }
		public decimal Price { get; set; }
	}
}
