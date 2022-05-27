namespace EKrumynas.DTOs.ShoppingCart
{
    public class PlantCartItemGetDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public PlantGetDto Plant { get; set; }
        public ProductGetDto Product { get; set; }
    }
}
