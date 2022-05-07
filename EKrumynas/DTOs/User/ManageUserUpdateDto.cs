using EKrumynas.Models;

namespace EKrumynas.DTOs.User
{
	public class ManageUserUpdateDto
	{
        #nullable enable
        public int Id { get; set; }
        // User details
        public string? FirstName { get; set; } = null;
        public string? LastName { get; set; } = null;
        public string? Username { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? ProfileImage { get; set; } = null;

        // Address
        public string? Country { get; set; } = null;
        public string? Street { get; set; } = null;
        public string? AddressLine1 { get; set; } = null;
        public string? AddressLine2 { get; set; } = null;

        public Role Role { get; set; }
    }
}

