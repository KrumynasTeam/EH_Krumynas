using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ProductUpdateDto
    {
        [Required] public string Name { get; set; }
        [Required] public string Description { get; set; }
        public int? DiscountId { get; set; }
        [Required] public List<ProductImageDto> Images { get; set; }
    }
}
