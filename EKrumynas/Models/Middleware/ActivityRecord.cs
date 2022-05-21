using System;
using System.ComponentModel.DataAnnotations;

namespace EKrumynas.Models.Middleware
{
	public class ActivityRecord
	{
		[Key]
		public int Id { get; set; }
		public string Username { get; set; }
		public string Role { get; set; }
		public DateTime Date { get; set; } = DateTime.UtcNow;
		public string Method { get; set; }
    }
}
