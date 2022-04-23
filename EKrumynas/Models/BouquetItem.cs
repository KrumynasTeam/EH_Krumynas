using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class BouquetItem
    {
        [Key]
        public int Id { get; set; }
        public int BouquetId { get; set; }
        public int? PlantId { get; set; }
        public int Quantity { get; set; }

        public virtual Plant Plant { get; set; }
    }
}
