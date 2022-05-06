using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.DTOs
{
    public class BouquetAddDto
    {
        [Required] public int ProductId { get; set; }

        [Required] public List<BouquetItemAddDto> Items { get; set; }
    }
}
