using AutoMapper;
using EKrumynas.DTOs;
using EKrumynas.DTOs.ShoppingCart;
using EKrumynas.DTOs.User;
using EKrumynas.Models;
using EKrumynas.Models.OrderDetails;
using EKrumynas.Services;
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
                Description = x.Description
            });

            CreateMap<ProductImageDto, ProductImage>().ConstructUsing(x => new ()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                ImagePath = x.ImagePath
            });

            CreateMap<PlantAddDto, Plant>().ConstructUsing(x => new()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Price = x.Price
            });

            CreateMap<PotAddDto, Pot>().ConstructUsing(x => new()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Size = (PotSize)Enum.Parse(typeof(PotSize), x.Size, true),
                Price = x.Price
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

            CreateMap<ShoppingCartAddDto, ShoppingCart>();

            CreateMap<PotCartItemAddDto, PotCartItem>().ConstructUsing(x => new()
            {
                PotId = x.VariantId,
                Quantity = x.Quantity
            });

            CreateMap<PlantCartItemAddDto, PlantCartItem>().ConstructUsing(x => new()
            {
                PlantId = x.VariantId,
                Quantity = x.Quantity
            });

            CreateMap<BouquetCartItemAddDto, BouquetCartItem>().ConstructUsing(x => new()
            {
                BouquetId = x.VariantId,
                Quantity = x.Quantity
            });

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
                UserId = (x.User != null) ? x.User.Id : null,
                Status = x.Status.ToString()
            });
            
            CreateMap<PotCartItem, PotCartItemGetDto>()
                .ForMember(dst => dst.Product, opt => opt.MapFrom(src => src.Pot.Product));
            
            CreateMap<PlantCartItem, PlantCartItemGetDto>()
                .ForMember(dst => dst.Product, opt => opt.MapFrom(src => src.Plant.Product));

            CreateMap<BouquetCartItem, BouquetCartItemGetDto>()
                .ForMember(dst => dst.Product, opt => opt.MapFrom(src => src.Bouquet.Product));

            CreateMap<ItemVariants<Product, Pot>, ItemVariants<ProductGetDto, PotGetDto>>();
            CreateMap<ItemVariants<Product, Plant>, ItemVariants<ProductGetDto, PlantGetDto>>();
            CreateMap<ItemVariants<Product, Bouquet>, ItemVariants<ProductGetDto, BouquetGetDto>>();

            CreateMap<ItemVariants<ProductAddDto, PotAddDto>, ItemVariants<Product, Pot>>();
            CreateMap<ItemVariants<ProductAddDto, PlantAddDto>, ItemVariants<Product, Plant>>();
            CreateMap<ItemVariants<ProductAddDto, BouquetAddDto>, ItemVariants<Product, Bouquet>>();

            CreateMap<ProductUpdateDto, Product>();
            CreateMap<PotUpdateDto, Pot>();
            CreateMap<PlantUpdateDto, Plant>();
            CreateMap<BouquetUpdateDto, Bouquet>();

            CreateMap<ItemVariants<ProductUpdateDto, PotUpdateDto>, ItemVariants<Product, Pot>>();
            CreateMap<ItemVariants<ProductUpdateDto, PlantUpdateDto>, ItemVariants<Product, Plant>>();
            CreateMap<ItemVariants<ProductUpdateDto, BouquetUpdateDto>, ItemVariants<Product, Bouquet>>();
        }
    }
}

