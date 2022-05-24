using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class PlantCartItem
    {
        [Key]
        public int Id { get; set; }
        public int PlantId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Quantity {0} must be greater than {1}.")]
        public int Quantity { get; set; }

        public virtual ShoppingCart ShoppingCart { get; set; }
        public virtual Plant Plant { get; set; }
    }
}
