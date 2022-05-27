using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class BouquetGetDto
    {
        [Required] public int Id { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public int Stock { get; set; }
        [Required] public List<BouquetItemGetDto> Items { get; set; }
    }
}
