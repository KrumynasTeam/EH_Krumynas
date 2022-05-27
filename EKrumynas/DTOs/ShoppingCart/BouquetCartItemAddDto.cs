using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class BouquetCartItemAddDto
    {
        [Required] public int VariantId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
