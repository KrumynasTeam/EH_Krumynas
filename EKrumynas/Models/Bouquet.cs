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

        public Bouquet()
        {
            Items = new HashSet<BouquetItem>();
        }
    }
}
