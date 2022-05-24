using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class Bouquet
    {
        [Key]
        public int Id { get; set; }
        public virtual Product Product { get; set; }
        public virtual ICollection<BouquetItem> Items { get; set; }
        [Range(0.0, double.MaxValue, ErrorMessage = "Price {0} must be greater than {1}.")]
        public decimal Price { get; set; }

        [Range(0, uint.MaxValue, ErrorMessage = "Stock {0} must be greater than {1}.")]
        public int Stock { get; set; }

        public Bouquet()
        {
            Items = new HashSet<BouquetItem>();
        }
    }
}
