using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class PlantAddDto
    {
        [Required] public string Color { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public bool AddableToBouquet { get; set; }
        [Required] public int Stock { get; set; }

    }
}
