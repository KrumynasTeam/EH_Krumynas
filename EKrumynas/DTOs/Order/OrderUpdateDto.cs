using System.ComponentModel.DataAnnotations;
using EKrumynas.Models;

namespace EKrumynas.DTOs.Order
{
	public class OrderUpdateDto
	{
		[Required] public int Id { get; set; }
		[Required] public Status Status { get; set; }
		[Required] public byte[] RowVersion { get; set; }
	}
}

