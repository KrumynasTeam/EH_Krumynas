using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PlantCartItemGetDto
    {
        [Required] public int Quantity { get; set; }
        [Required] public PlantGetDto pot { get; set; }
    }
}
