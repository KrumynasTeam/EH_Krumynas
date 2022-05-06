using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class PotGetDto
    {
        [Required] public int Id { get; set; }
        [Required] public string Size { get; set; }
        [Required] public string Color { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public int ProductId { get; set; }
        [Required] public string Type { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Description { get; set; }
        public Discount Discount { get; set; }
        [Required] public List<ProductImageDto> Images { get; set; }
    }
}
