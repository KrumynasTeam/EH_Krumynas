using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class BouquetCartItem
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }

        public virtual ShoppingCart ShoppingCart { get; set; }
        public virtual Bouquet Bouquet { get; set; }
    }
}
