using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace EKrumynas.Services.Utils
{
	public class UserSession
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public UserSession(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public int UserId => int.Parse(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
	}
}

