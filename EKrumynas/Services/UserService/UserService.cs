using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EKrumynas.Data;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Services.UserService
{
	public class UserService : IUserService
	{
        private readonly EKrumynasDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(EKrumynasDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetUserId => int.Parse(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);

        public async Task<User> Get()
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == GetUserId);
        }

        public async Task<User> Update(UserUpdateDto user)
        {
            User foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == GetUserId);

            foundUser.FirstName = user.FirstName;
            foundUser.LastName = user.LastName;
            foundUser.Username = user.Username;
            foundUser.ProfileImage = user.ProfileImage;

            foundUser.Country = user.Country;
            foundUser.Street = user.Street;
            foundUser.AddressLine1 = user.AddressLine1;
            foundUser.AddressLine2 = user.AddressLine2;

            if (user.Password != null)
            {
                CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);

                foundUser.PasswordHash = passwordHash;
                foundUser.PasswordSalt = passwordSalt;
            }
             
            _context.Users.Update(foundUser);

            await _context.SaveChangesAsync();
            return foundUser;
        }

        public async Task<User> Delete()
        {
            User foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == GetUserId);

            if (foundUser == null)
            {
                throw new NotImplementedException();
            }

            _context.Remove(foundUser);
            await _context.SaveChangesAsync();

            return foundUser;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}

