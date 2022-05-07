using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models
{
    public enum Role
    {
        [Description("USER")]
        USER,
        [Description("ADMIN")]
        ADMIN
    }

    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public byte[] PasswordHash { get; set; }
        [Required] public byte[] PasswordSalt { get; set; }
        public string ProfileImage { get; set; }
        public DateTime CreatedAt { get; }

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public Role Role { get; set; } = Role.USER;
    }
}
