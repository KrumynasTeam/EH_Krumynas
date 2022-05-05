using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public enum CartStatus
    {
        Active,
        Inactive
    }

    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public CartStatus Status { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<PlantCartItem> Plants { get; set; }
        public virtual ICollection<PotCartItem> Pots { get; set; }
        public virtual ICollection<BouquetCartItem> Bouquets { get; set; }

        public ShoppingCart()
        {
            Plants = new HashSet<PlantCartItem>();
            Pots = new HashSet<PotCartItem>();
            Bouquets = new HashSet<BouquetCartItem>();
        }
    }
}
