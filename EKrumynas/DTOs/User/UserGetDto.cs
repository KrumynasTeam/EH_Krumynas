using System;
using EKrumynas.Models;

namespace EKrumynas.DTOs.User
{
	public class UserGetDto
	{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string ProfileImage { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public Role Role { get; set; }
    }
}

