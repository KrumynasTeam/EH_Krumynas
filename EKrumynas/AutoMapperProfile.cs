using AutoMapper;
using EKrumynas.DTOs;
using EKrumynas.Models;
using System;

namespace EKrumynas
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {         
            CreateMap<ProductAddDto, Product>().ConstructUsing(x => new Product()
            {
                Name = x.Name,
                Description = x.Description,
                Type = (ProductType) Enum.Parse(typeof(ProductType), x.Type, true),
            });

            CreateMap<ProductImageDto, ProductImage>().ConstructUsing(x => new ProductImage()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                ImagePath = x.ImagePath
            });

            CreateMap<PlantAddDto, Plant>().ConstructUsing(x => new Plant()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Price = x.Price
            });

            CreateMap<PotAddDto, Pot>().ConstructUsing(x => new Pot()
            {
                Color = (ProductColor)Enum.Parse(typeof(ProductColor), x.Color, true),
                Size = (PotSize)Enum.Parse(typeof(PotSize), x.Size, true),
                Price = x.Price
            });

            CreateMap<BouquetAddDto, Bouquet>();

            CreateMap<BouquetItemAddDto, BouquetItem>().ConstructUsing(x => new BouquetItem()
            {
                Quantity = x.Quantity
            });

            CreateMap<ProductImage, ProductImageDto>();

            CreateMap<Bouquet, BouquetGetDto>().ConstructUsing(x => new BouquetGetDto()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images, 
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<Pot, PotGetDto>().ConstructUsing(x => new PotGetDto()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images,
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<Plant, PlantGetDto>().ConstructUsing(x => new PlantGetDto()
            {
                ProductId = x.Product.Id,
                Type = x.Product.Type.ToString(),
                Name = x.Product.Name,
                Description = x.Product.Description,
                Discount = x.Product.Discount,
            }).ForMember(
                b => b.Images,
                p => p.MapFrom(p => p.Product.Images));

            CreateMap<BouquetItem, BouquetItemGetDto>();

            CreateMap<Product, ProductGetDto>().ConstructUsing(x => new ProductGetDto()
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

