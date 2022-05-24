using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class ShoppingCartItem
    {
        [Key]
        public int Id { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Quantity {0} must be greater than {1}.")]
        public int Quantity { get; set; }
        public virtual PlantCartItem Plants { get; set; }
        public virtual PotCartItem Pots { get; set; }
        public virtual BouquetCartItem Bouquets { get; set; }
    }
}
