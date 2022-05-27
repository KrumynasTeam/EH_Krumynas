using System.Collections.Generic;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class ShoppingCartAddDto
    {
        public int? UserId { get; set; }

        public List<PotCartItemAddDto> Pots { get; set; }
        public List<PlantCartItemAddDto> Plants { get; set; }
        public List<BouquetCartItemAddDto> Bouquets { get; set; }
    }
}
