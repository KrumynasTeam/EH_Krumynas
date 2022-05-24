using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        [Range(0.0, 100.0, ErrorMessage = "Amount {0} must be between [0.0] and [100.0].")]
        public decimal Amount { get; set; }
        [Required] public string Description { get; set; }
    }
}
