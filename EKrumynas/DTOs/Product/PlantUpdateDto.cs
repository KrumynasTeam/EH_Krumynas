using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class PlantUpdateDto
    {
        [Required] public int Id { get; set; }
        [Required] public string Color { get; set; }
        [Required] public decimal Price { get; set; }
    }
}
