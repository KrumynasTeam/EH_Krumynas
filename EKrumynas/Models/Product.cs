using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EKrumynas.Models
{
    public enum ProductType
    {
        Plant,
        Pot,
        Bouquet
    }

    public enum ProductColor
    {
        White,
        Black,
        Red,
        Green,
        Blue
    }

    public class Product
    {
        [Key]
        public int Id { get; set; }
        public ProductType Type { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Description { get; set; }
        public int DiscountId { get; set; }
        
        public virtual Discount Discount { get; set; }

        public virtual ICollection<ProductImage> Images { get; set; }
    }
}
