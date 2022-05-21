using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class PlantCartItemAddDto
    {
        [Required] public int Id { get; set; }
        [Required] public string Color { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public int Quantity { get; set; }
    }
}
