using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PotSize
    {
        Small,
        Medium,
        Large
    }

    public class Pot
    {
        [Key]
        public int Id { get; set; }
        public PotSize Size { get; set; }
        public ProductColor Color { get; set; }
        [Range(0.0, double.MaxValue, ErrorMessage = "Price {0} must be greater than {1}.")]
        public decimal Price { get; set; }

        [Range(0, uint.MaxValue, ErrorMessage = "Stock {0} must be greater than {1}.")]
        public int Stock { get; set; }

        public virtual Product Product { get; set; }
    }
}
