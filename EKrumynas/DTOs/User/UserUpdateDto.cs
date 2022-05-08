namespace EKrumynas.DTOs.User
{
    public class UserUpdateDto
	{
        #nullable enable
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

        public string? Password { get; set; } = null;

        public bool MergeAll { get; set; } = false;
    }
}

