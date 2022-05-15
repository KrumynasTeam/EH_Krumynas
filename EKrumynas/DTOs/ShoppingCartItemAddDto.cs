using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ShoppingCartItemAddDto
    {
        [Required] public int ItemId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
