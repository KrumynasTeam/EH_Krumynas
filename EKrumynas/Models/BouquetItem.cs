using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class BouquetItem
    {
        [Key]
        public int Id { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Quantity {0} must be greater than {1}.")]
        public int Quantity { get; set; }
        public int BouquetId { get; set; }
        public int PlantId { get; set; }
    }
}
