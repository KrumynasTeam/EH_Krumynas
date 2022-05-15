using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ShoppingCartGetDto
    {
        [Required] public int CartId { get; set; }
        public int UserId { get; set; }
        [Required] public CartStatus status { get; set; }
        public Discount Discount { get; set; }

        [Required] public virtual List<ProductImageDto> Images { get; set; }
        [Required] public virtual ICollection<ShoppingCartItemGetDto> CartItems { get; set; }
    }
}
