using System;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class BlogPost
    {
        [Key]
        public int Id { get; set; }
        [Required] public string Title { get; set; }
        [Required] public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string ImageUrl { get; set; }
        [ConcurrencyCheck]
        public int Version { get; set; }
    }
}
