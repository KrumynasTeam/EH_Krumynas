using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models.OrderDetails
{
	public class ShoppingCartSnapshot
	{
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }

        public virtual ICollection<PlantCartItemSnapshot> Plants { get; set; }
        public virtual ICollection<PotCartItemSnapshot> Pots { get; set; }
        public virtual ICollection<BouquetCartItemSnapshot> Bouquets { get; set; }

        public ShoppingCartSnapshot()
        {
            Plants = new HashSet<PlantCartItemSnapshot>();
            Pots = new HashSet<PotCartItemSnapshot>();
            Bouquets = new HashSet<BouquetCartItemSnapshot>();
        }
    }
}
