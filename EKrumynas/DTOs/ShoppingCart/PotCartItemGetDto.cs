namespace EKrumynas.DTOs.ShoppingCart
{
    public class PotCartItemGetDto
    {
        public int Quantity { get; set; }
        public PotGetDto Pot { get; set; }
        public ProductGetDto Product { get; set; }
    }
}
