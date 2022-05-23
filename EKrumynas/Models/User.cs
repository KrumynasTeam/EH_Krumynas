using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EKrumynas.Models
{
    [DataContract(Name = "Role")]
    public enum Role
    {
        [Description("USER")]
        [EnumMember]
        USER = 0,
        [Description("ADMIN")]
        [EnumMember]
        ADMIN = 1
    }

    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [JsonIgnore]
        [Required]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        [Required]
        public byte[] PasswordSalt { get; set; }
        public string ProfileImage { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public Role Role { get; set; } = Role.USER;
    }
}
