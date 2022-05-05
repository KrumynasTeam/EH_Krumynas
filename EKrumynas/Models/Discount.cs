using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        [Required] public string Description { get; set; }
    }
}
