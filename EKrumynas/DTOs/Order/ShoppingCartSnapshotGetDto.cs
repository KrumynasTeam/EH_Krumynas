using System.Collections.Generic;

namespace EKrumynas.DTOs.Order
{
    public class ShoppingCartSnapshotGetDto
    {
        public int Id { get; set; }

        public virtual List<PlantCartItemSnapshotGetDto> Plants { get; set; }
        public virtual List<PotCartItemSnapshotGetDto> Pots { get; set; }
        public virtual List<BouquetCartItemSnapshotGetDto> Bouquets { get; set; }
    }
}
