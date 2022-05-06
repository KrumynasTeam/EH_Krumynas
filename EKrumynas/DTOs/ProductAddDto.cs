using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ProductAddDto
    {
        [Required] public string Name { get; set; }
        [Required] public string Type { get; set; }
        [Required] public string Description { get; set; }
        public int? DiscountId { get; set; }
        [Required] public List<ProductImageDto> Images { get; set; }
    }
}
