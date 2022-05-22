using AutoMapper;
using EKrumynas.DTOs;
using EKrumynas.DTOs.ShoppingCart;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using EKrumynas.Services;
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

            CreateMap<ShoppingCartAddDto, ShoppingCart>().ConstructUsing(x => new()
            {
                User = new() { Id = x.UserId }
            });

            CreateMap<PotCartItemAddDto, PotCartItem>().ConstructUsing(x => new()
            {
                Id = x.Id,
                Quantity = x.Quantity
            });

            CreateMap<PlantCartItemAddDto, PlantCartItem>().ConstructUsing(x => new()
            {
                Id = x.Id,
                Quantity = x.Quantity
            });

            CreateMap<BouquetCartItemAddDto, BouquetCartItem>().ConstructUsing(x => new()
            {
                Id = x.Id,
                Quantity = x.Quantity
            });

            CreateMap<ProductImage, ProductImageDto>();

            CreateMap<ProductImage, ProductImageDto>();        
            CreateMap<Bouquet, BouquetGetDto>();
            CreateMap<Pot, PotGetDto>();
            CreateMap<Plant, PlantGetDto>();

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

            CreateMap<ShoppingCart, ShoppingCartGetDto>().ConstructUsing(x => new()
            {
                CartId = x.Id,
                UserId = x.User.Id,
                Status = x.Status.ToString()
            });

            CreateMap<PotCartItem, PotCartItemGetDto>().ConstructUsing(x => new()
            {
                Quantity = x.Quantity
            });

            CreateMap<PlantCartItem, PlantCartItemGetDto>().ConstructUsing(x => new()
            {
                Quantity = x.Quantity
            });

            CreateMap<BouquetCartItem, BouquetCartItemGetDto>().ConstructUsing(x => new()
            {
                Quantity = x.Quantity
            });
            CreateMap<ItemVariants<Product, Pot>, ItemVariants<ProductGetDto, PotGetDto>>();
            CreateMap<ItemVariants<Product, Plant>, ItemVariants<ProductGetDto, PlantGetDto>>();
            CreateMap<ItemVariants<Product, Bouquet>, ItemVariants<ProductGetDto, BouquetGetDto>>();
        }
    }
}

