namespace EKrumynas.DTOs.ShoppingCart
{
    public class PlantCartItemGetDto
    {
        public int Quantity { get; set; }
        public PlantGetDto Plant { get; set; }
        public ProductGetDto Product { get; set; }
    }
}
