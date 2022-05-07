using AutoMapper;
using EKrumynas.DTOs.User;
using EKrumynas.Models;


/*
 * Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public byte[] PasswordHash { get; set; }
        [Required] public byte[] PasswordSalt { get; set; }
        public string ProfileImage { get; set; }
        public DateTime CreatedAt { get; }

        public string Country { get; set; }
        public string Street { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public Role Role { get; set; } = Role.USER;
 */
namespace EKrumynas
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<User, UserGetDto>().ConstructUsing(x => new()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                ProfileImage = x.ProfileImage,
                CreatedAt = x.CreatedAt,
                Country = x.Country,
                Street = x.Street,
                AddressLine1 = x.AddressLine1,
                AddressLine2 = x.AddressLine2
            });

            CreateMap<UserUpdateDto, User>().ConstructUsing(x => new()
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                ProfileImage = x.ProfileImage,
                Country = x.Country,
                Street = x.Street,
                AddressLine1 = x.AddressLine1,
                AddressLine2 = x.AddressLine2,
            }
            );
        }
    }
}

