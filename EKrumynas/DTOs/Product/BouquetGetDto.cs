using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class BouquetGetDto
    {
        [Required] public int Id { get; set; }
        [Required] public decimal Price { get; set; }
        [Required] public int Stock { get; set; }
        [Required] public virtual ICollection<BouquetItemGetDto> Items { get; set; }
    }
}
