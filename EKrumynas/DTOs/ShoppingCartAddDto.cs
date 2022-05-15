using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ShoppingCartAddDto
    {
        [Required] public int CartId { get; set; }
        public int UserId { get; set; }

        [Required] public virtual List<ProductImageDto> Images { get; set; }
        [Required] public virtual ICollection<ShoppingCartItemAddDto> CartItems { get; set; }
    }
}
