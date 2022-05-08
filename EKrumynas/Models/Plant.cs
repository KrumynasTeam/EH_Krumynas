using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class Plant
    {
        [Key]
        public int Id { get; set; }
        public ProductColor Color { get; set; }
        public decimal Price { get; set; }

        public virtual Product Product { get; set; }

    }
}
