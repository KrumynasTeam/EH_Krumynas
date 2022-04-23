using System;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string ProfileImage { get; set; }
        [Required] public byte[] PasswordHash { get; set; }
        [Required] public byte[] PasswordSalt { get; set; }
        public DateTime CreatedAt { get; }

        //TODO: Billing info
    }
}
