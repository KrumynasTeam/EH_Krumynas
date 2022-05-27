using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PlantCartItemAddDto
    {
        [Required] public int VariantId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
