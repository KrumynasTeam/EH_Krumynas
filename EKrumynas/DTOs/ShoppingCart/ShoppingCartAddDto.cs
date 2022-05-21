using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class ShoppingCartAddDto
    {
        [Required] public int UserId { get; set; }

        [Required] public virtual List<ProductImageDto> Images { get; set; }
        [Required] public virtual ICollection<PotCartItemAddDto> PotItems { get; set; }
        [Required] public virtual ICollection<PlantCartItemAddDto> PlantItems { get; set; }
        [Required] public virtual ICollection<BouquetCartItemAddDto> BouquetItems { get; set; }
    }
}
