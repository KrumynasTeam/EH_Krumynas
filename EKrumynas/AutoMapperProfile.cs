using AutoMapper;
using EKrumynas.DTOs;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using System;

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
            
            CreateMap<ProductAddDto, Product>().ConstructUsing(x => new()
            {
                Name = x.Name,
                Description = x.Description,
                Type = (ProductType) Enum.Parse(typeof(ProductType), x.Type, true),
            });

            CreateMap<ProductImageDto, ProductImage>().ConstructUsing(x => new ()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                ImagePath = x.ImagePath
            });

            CreateMap<PlantAddDto, Plant>().ConstructUsing(x => new()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Price = x.Price,
                Product = new() { Id = x.ProductId }
            });

            CreateMap<PotAddDto, Pot>().ConstructUsing(x => new()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Size = (PotSize)Enum.Parse(typeof(PotSize), x.Size, true),
                Price = x.Price,
                Product = new() { Id = x.ProductId }
            });

            CreateMap<BouquetAddDto, Bouquet>().ConstructUsing(x => new()
            {
                Product = new() { Id = x.ProductId }
            });

            CreateMap<BouquetItemAddDto, BouquetItem>().ConstructUsing(x => new()
            {
                Quantity = x.Quantity,
                PlantId = x.PlantId
            });

            CreateMap<ProductImage, ProductImageDto>();

            CreateMap<Bouquet, BouquetGetDto>().ConstructUsing(x => new()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images, 
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<Pot, PotGetDto>().ConstructUsing(x => new()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images,
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<Plant, PlantGetDto>().ConstructUsing(x => new()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images,
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<BouquetItem, BouquetItemGetDto>().ConstructUsing(x => new()
            {
                PlantId = x.PlantId,
                Quantity = x.Quantity
            });

            CreateMap<Product, ProductGetDto>().ConstructUsing(x => new()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Type = x.Type.ToString(),
                Discount = x.Discount
            });

        }
    }
}

