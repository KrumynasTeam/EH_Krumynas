using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CartStatus
    {
        Active,
        Inactive
    }

    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }
        public CartStatus Status { get; set; }

        #nullable enable
        public virtual User? User { get; set; }
        #nullable disable

        public virtual ICollection<PlantCartItem> Plants { get; set; }
        public virtual ICollection<PotCartItem> Pots { get; set; }
        public virtual ICollection<BouquetCartItem> Bouquets { get; set; }

        public ShoppingCart()
        {
            Plants = new HashSet<PlantCartItem>();
            Pots = new HashSet<PotCartItem>();
            Bouquets = new HashSet<BouquetCartItem>();
        }
    }
}
