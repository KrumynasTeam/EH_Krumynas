using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class BouquetCartItem
    {
        [Key]
        public int Id { get; set; }
        public int BouquetId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Quantity {0} must be greater than {1}.")]
        public int Quantity { get; set; }

        public virtual ShoppingCart ShoppingCart { get; set; }
        public virtual Bouquet Bouquet { get; set; }
    }
}
