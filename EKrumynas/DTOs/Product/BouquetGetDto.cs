using EKrumynas.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class BouquetGetDto
    {
        [Required] public int Id { get; set; }
        [Required] public virtual ICollection<BouquetItemGetDto> Items { get; set; }
    }
}
