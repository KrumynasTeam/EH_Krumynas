using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EKrumynas.Services;
using EKrumynas.DTOs;
using AutoMapper;
using System.Threading.Tasks;
using System;
using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Authorization;

namespace EKrumynas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BouquetController : ControllerBase
    {
        private readonly IBouquetService _bouquetService;
        private readonly IMapper _mapper;

        public BouquetController(IBouquetService bouquetService, IMapper mapper)
        {
            _bouquetService = bouquetService;
            _mapper = mapper;
        }

        /*
        [HttpGet]
        public async Task<IList<BouquetGetDto>> GetAll()
        {
            try
            {
                var bouquets = await _bouquetService.GetAll();
                var bouquetGetDtos = _mapper.Map<List<BouquetGetDto>>(bouquets);

                return bouquetGetDtos ?? new List<BouquetGetDto>();

            }
            catch(ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<BouquetGetDto> GetById(int id)
        {
            try
            {
                var bouquet = await _bouquetService.GetById(id);
                var bouquetGetDto = _mapper.Map<BouquetGetDto>(bouquet);

                return bouquetGetDto ?? new BouquetGetDto();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }
        */
        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<ItemVariants<ProductGetDto, BouquetGetDto>> DeleteByProductId(int productId)
        {
            try
            {
                var bouquet = await _bouquetService.DeleteByProductId(productId);
                var bouquetGetDto = _mapper.Map<ItemVariants<ProductGetDto, BouquetGetDto>>(bouquet);

                return bouquetGetDto ?? new ItemVariants<ProductGetDto, BouquetGetDto>();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(ItemVariants<ProductAddDto, BouquetAddDto> bouquetAddDto)
        {
            try
            {
                ItemVariants<Product, Bouquet> bouquet = _mapper.Map<ItemVariants<Product, Bouquet>>(bouquetAddDto);

                var createdBouquet = await _bouquetService.Create(bouquet);
                var bouquetGetDto = _mapper.Map<ItemVariants<ProductGetDto, BouquetGetDto>>(createdBouquet);

                return Ok(bouquetGetDto);
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPut, Authorize(Roles = "ADMIN")]
        [Route("{productId}")]
        public async Task<IActionResult> Update(int productId, ItemVariants<ProductUpdateDto, BouquetUpdateDto> bouquetUpdateDto)
        {
            try
            {
                ItemVariants<Product, Bouquet> bouquet = _mapper.Map<ItemVariants<Product, Bouquet>>(bouquetUpdateDto);
                bouquet.Item.Id = productId;
                bouquet.Item.Type = ProductType.Bouquet;
                var updatedBouquet = await _bouquetService.Update(bouquet);
                var bouquetGetDto = _mapper.Map<ItemVariants<ProductGetDto, BouquetGetDto>>(updatedBouquet);

                return Ok(bouquetGetDto);
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllByProduct()
        {
            try
            {
                var variants = await _bouquetService.GetAllByProduct();
                List<ItemVariants<ProductGetDto, BouquetGetDto>> variantsDtos =
                    _mapper.Map<List<ItemVariants<ProductGetDto, BouquetGetDto>>>(variants);

                return Ok(variantsDtos ?? new List<ItemVariants<ProductGetDto, BouquetGetDto>>());
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{productId}")]
        public async Task<IActionResult> GetAllByProductId(int productId)
        {
            try
            {
                var variants = await _bouquetService.GetByProductId(productId);
                ItemVariants<ProductGetDto, BouquetGetDto> variantsDtos =
                    _mapper.Map<ItemVariants<ProductGetDto, BouquetGetDto>>(variants);

                return Ok(variantsDtos ?? new ItemVariants<ProductGetDto, BouquetGetDto>());
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }
    }
}
