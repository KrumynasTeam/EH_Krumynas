using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PotCartItemGetDto
    {
        [Required] public int Quantity { get; set; }
        [Required] public PotGetDto pot { get; set; }
    }
}
