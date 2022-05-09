using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class PlantAddDto
    {
        [Required] public int ProductId { get; set; }
        [Required] public string Color { get; set; }
        [Required] public decimal Price { get; set; }
    }
}
