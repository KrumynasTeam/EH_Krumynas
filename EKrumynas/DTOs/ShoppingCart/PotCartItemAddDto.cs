using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PotCartItemAddDto
    {
        [Required] public int PotId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
