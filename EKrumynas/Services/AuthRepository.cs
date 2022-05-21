using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
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
        private readonly Regex _emailRegex;
        private readonly Regex _usernameRegex;
        private readonly Regex _passwordRegex;

        public AuthRepository(EKrumynasDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _emailRegex = new Regex(@"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$");
            _usernameRegex = new Regex("^[A-Za-z0-9]{1,6}"); // TODO
            _passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$");
        }

        public async Task<string> Login(string usernameOrEmail, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Username.ToLower().Equals(usernameOrEmail.ToLower()) || x.Email.ToLower().Equals(usernameOrEmail.ToLower())
            );

            if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new ApiException(
                    statusCode: 404,
                    message: "Incorrect username/email or password."
                );
            }

            return CreateToken(user);
        }

        public async Task<string> Register(User user, string password)
        {
            ValidateInputs(user.Email, user.Username, password);

            if (user.Username.ToLower().Equals("anonymous") || await UserExists(user.Username))
                ThrowBadRequestApiException("Username is already in use.");

            if (await UserExists(user.Email))
                ThrowBadRequestApiException("Email is already in use.");

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
                return true;

            return false;
        }

        private void ValidateInputs(string email, string username, string password)
        {
            if (!_emailRegex.IsMatch(email))
                ThrowBadRequestApiException("Invalid email address.");

            //if (!_usernameRegex.IsMatch(username))
                //ThrowBadRequestApiException("Username must be between 6-12 characters only of letters and numbers.");

            if (!_passwordRegex.IsMatch(password))
                ThrowBadRequestApiException("Password must be between 8-16 characters long and contain one upper letter, lower letter and number.");
        }

        private void ThrowBadRequestApiException(string message)
        {
            throw new ApiException(
                statusCode: 400,
                message: message
            );
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

