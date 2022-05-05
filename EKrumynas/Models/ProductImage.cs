using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class ProductImage
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public ProductColor Color { get; set; }
        [Required] public string ImagePath { get; set; }
    }
}
