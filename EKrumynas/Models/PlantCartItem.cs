using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class PlantCartItem
    {
        [Key]
        public int Id { get; set; }
        public int ShoppingCartId { get; set; }
        public int PlantId { get; set; }
        public int Quantity { get; set; }

        public virtual ShoppingCart ShoppingCart { get; set; }
        public virtual Plant Plant { get; set; }
    }
}
