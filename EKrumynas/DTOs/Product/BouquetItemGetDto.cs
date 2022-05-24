using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class BouquetItemGetDto
    {
        [Required] public int PlantId { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
