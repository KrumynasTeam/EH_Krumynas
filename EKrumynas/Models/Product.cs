using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProductType
    {
        Plant,
        Pot,
        Bouquet
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
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

#nullable enable
        public virtual Discount? Discount { get; set; }

        public virtual ICollection<ProductImage> Images { get; set; }

        public Product()
        {
            Images = new HashSet<ProductImage>();
        }
    }
}
