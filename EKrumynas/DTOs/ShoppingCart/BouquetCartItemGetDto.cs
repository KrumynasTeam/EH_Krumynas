using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class BouquetCartItemGetDto
    {
        [Required] public int Quantity { get; set; }
        [Required] public BouquetGetDto pot { get; set; }
    }
}
