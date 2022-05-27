using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PotCartItemAddDto
    {
        [Required] public int VariantId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
