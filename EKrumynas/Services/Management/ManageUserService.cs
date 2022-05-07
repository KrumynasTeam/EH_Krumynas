using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EKrumynas.Data;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using Microsoft.AspNetCore.Http;
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

            foundUser.FirstName = user.FirstName;
            foundUser.LastName = user.LastName;
            foundUser.Username = user.Username;
            foundUser.ProfileImage = user.ProfileImage;

            foundUser.Country = user.Country;
            foundUser.Street = user.Street;
            foundUser.AddressLine1 = user.AddressLine1;
            foundUser.AddressLine2 = user.AddressLine2;
            foundUser.Role = user.Role;

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

