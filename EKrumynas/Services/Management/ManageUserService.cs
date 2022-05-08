using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.Data;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;

namespace EKrumynas.Services.Management
{
	public class ManageUserService : IManageUserService
	{
        private readonly EKrumynasDbContext _context;

        public ManageUserService(EKrumynasDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> Update(ManageUserUpdateDto user)
        {
            User foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

            // Return error if user not found

            if (user.MergeAll) {
                foundUser.FirstName = user.FirstName;
                foundUser.LastName = user.LastName;
                if (user.Username != null) foundUser.Username = user.Username;
                foundUser.ProfileImage = user.ProfileImage;
                foundUser.Country = user.Country;
                foundUser.Street = user.Street;
                foundUser.AddressLine1 = user.AddressLine1;
                foundUser.AddressLine2 = user.AddressLine2;
                if (user.Username != null) foundUser.Role = (Role)user.Role;
            } else {
                if (user.FirstName != null) foundUser.FirstName = user.FirstName;
                if (user.LastName != null) foundUser.LastName = user.LastName;
                if (user.Username != null) foundUser.Username = user.Username;
                if (user.ProfileImage != null) foundUser.ProfileImage = user.ProfileImage;
                if (user.Country != null) foundUser.Country = user.Country;
                if (user.Street != null) foundUser.Street = user.Street;
                if (user.AddressLine1 != null) foundUser.AddressLine1 = user.AddressLine1;
                if (user.AddressLine2 != null) foundUser.AddressLine2 = user.AddressLine2;
                if (user.Role != null) foundUser.Role = (Role)user.Role;
            }

            _context.Users.Update(foundUser);

            await _context.SaveChangesAsync();
            return foundUser;
        }

        public async Task<User> DeleteById(int id)
        {
            User foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (foundUser == null)
            {
                throw new NotImplementedException();
            }

            _context.Remove(foundUser);
            await _context.SaveChangesAsync();

            return foundUser;
        }
    }
}

