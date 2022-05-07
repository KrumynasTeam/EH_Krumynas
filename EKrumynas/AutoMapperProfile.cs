using AutoMapper;
using EKrumynas.DTOs.User;
using EKrumynas.Models;

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

