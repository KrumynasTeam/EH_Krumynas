using AutoMapper;
using EKrumynas.DTOs;
using EKrumynas.DTOs.ShoppingCart;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using EKrumynas.Models.OrderDetails;
using System;

namespace EKrumynas
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BouquetCartItem, BouquetCartItemSnapshot>().ConstructUsing(x => new()
            {
                Name = x.Bouquet.Product.Name,
                Description = x.Bouquet.Product.Description,
                Quantity = x.Quantity,
                Price = (decimal)0.0 // TODO: add total bouquet price
            });

            CreateMap<PlantCartItem, PlantCartItemSnapshot>().ConstructUsing(x => new()
            {
                Name = x.Plant.Product.Name,
                Description = x.Plant.Product.Description,
                Color = x.Plant.Color,
                Quantity = x.Quantity,
                Price = x.Plant.Price
            });

            CreateMap<PotCartItem, PotCartItemSnapshot>().ConstructUsing(x => new()
            {
                Name = x.Pot.Product.Name,
                Description = x.Pot.Product.Description,
                Color = x.Pot.Color,
                Size = x.Pot.Size,
                Quantity = x.Quantity,
                Price = x.Pot.Price
            });

            CreateMap<ShoppingCart, ShoppingCartSnapshot>().ConstructUsing(x => new()
            {
                Id = 0
            });

            CreateMap<User, UserGetDto>();
            
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
        }
    }
}

