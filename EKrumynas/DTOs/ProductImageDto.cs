using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class ProductImageDto
    {
        [Required] public string Color { get; set; }
        [Required] public string ImagePath { get; set; }
    }
}
