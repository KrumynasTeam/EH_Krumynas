using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using EKrumynas.Data;
using EKrumynas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EKrumynas.Services
{
    public class AuthRepository : IAuthRepository
    {
        private readonly EKrumynasDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthRepository(EKrumynasDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> Login(string usernameOrEmail, string password)
        {
            string response = string.Empty;
            User user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Username.ToLower().Equals(usernameOrEmail.ToLower()) || x.Email.ToLower().Equals(usernameOrEmail.ToLower())
            );
            if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect username or password."
                );
            }

            return CreateToken(user);
        }

        public async Task<string> Register(User user, string password)
        {
            if (await UserExists(user.Username))
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Username is already in use."
                );
            }
            if (await UserExists(user.Email))
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Email is already in use."
                );
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return CreateToken(user);
        }

        public async Task<bool> UserExists(string usernameOrEmail)
        {
            if (await _context.Users.AnyAsync(x => x.Username == usernameOrEmail || x.Email == usernameOrEmail))
            {
                return true;
            }
            return false;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != passwordHash[i])
                    return false;
            }
            return true;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            SymmetricSecurityKey key = new(
                Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)
            );

            SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMonths(2),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

