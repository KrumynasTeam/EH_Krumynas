using EKrumynas.Models;
using System.Collections.Generic;

namespace EKrumynas.DTOs.ShoppingCart
{
    public class ShoppingCartGetDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Status { get; set; }
        public Discount Discount { get; set; }

        public List<PotCartItemGetDto> Pots { get; set; }
        public List<PlantCartItemGetDto> Plants { get; set; }
        public List<BouquetCartItemGetDto> Bouquets { get; set; }
    }
}
