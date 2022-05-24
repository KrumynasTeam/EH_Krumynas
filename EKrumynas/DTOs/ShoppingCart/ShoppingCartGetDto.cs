using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class ShoppingCartGetDto
    {
        [Required] public int CartId { get; set; }
        public int? UserId { get; set; }
        [Required] public string Status { get; set; }
        public Discount Discount { get; set; }

        [Required] public virtual List<ProductImageDto> Images { get; set; }
        [Required] public virtual ICollection<PotCartItemGetDto> PotItems { get; set; }
        [Required] public virtual ICollection<PlantCartItemGetDto> PlantItems { get; set; }
        [Required] public virtual ICollection<BouquetCartItemGetDto> BouquetItems { get; set; }
    }
}
