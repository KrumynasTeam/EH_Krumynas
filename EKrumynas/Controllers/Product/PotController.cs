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
    public class PotController : ControllerBase
    {
        private readonly IPotService _potService;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public PotController(IPotService potService, IMapper mapper, IProductService productService)
        {
            _productService = productService;
            _potService = potService;
            _mapper = mapper;
        }
        /*
        [HttpGet]
        [Route("test")]
        public async Task<IList<PotGetDto>> GetAll()
        {
            try
            {
                var pots = await _potService.GetAll();
                var potGetDtos = _mapper.Map<List<PotGetDto>>(pots);

                return potGetDtos ?? new List<PotGetDto>();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<PotGetDto> GetById(int id)
        {
            try
            {
                var pot = await _potService.GetById(id);
                var potGetDto = _mapper.Map<PotGetDto>(pot);

                return potGetDto ?? new PotGetDto();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<PotGetDto> DeleteById(int id)
        {
            try
            {
                var pot = await _potService.DeleteById(id);
                var potGetDto = _mapper.Map<PotGetDto>(pot);

                return potGetDto ?? new PotGetDto();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(PotAddDto potAddDto)
        {
            try
            {
                Pot pot = _mapper.Map<Pot>(potAddDto);
                var createdPot = await _potService.Create(pot);
                var potGetDto = _mapper.Map<PotGetDto>(createdPot);

                return Ok(potGetDto);
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPut, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<IActionResult> Update(int id, PotAddDto potAddDto)
        {
            try
            {
                Pot pot = _mapper.Map<Pot>(potAddDto);
                pot.Id = id;
                var updatedPot = await _potService.Update(pot);
                var potGetDto = _mapper.Map<ProductGetDto>(updatedPot);

                return Ok(potGetDto);
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }
        */
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllByProduct()
        {
            try
            {
                var variants = await _potService.GetAllByProduct();
                List<ItemVariants<ProductGetDto, PotGetDto>> variantsDtos = 
                    _mapper.Map<List<ItemVariants<ProductGetDto, PotGetDto>>>(variants);

                return Ok(variantsDtos ?? new List<ItemVariants<ProductGetDto, PotGetDto>>());
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
                var variants = await _potService.GetByProductId(productId);
                ItemVariants<ProductGetDto, PotGetDto> variantsDtos =
                    _mapper.Map<ItemVariants<ProductGetDto, PotGetDto>>(variants);

                return Ok(variantsDtos ?? new ItemVariants<ProductGetDto, PotGetDto>());
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{productId}")]
        public async Task<ItemVariants<ProductGetDto, PotGetDto>> DeleteByProductId(int productId)
        {
            try
            {
                var pot = await _potService.DeleteByProductId(productId);
                var potGetDto = _mapper.Map<ItemVariants<ProductGetDto, PotGetDto>>(pot);

                return potGetDto ?? new ItemVariants<ProductGetDto, PotGetDto>();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(ItemVariants<ProductAddDto, PotAddDto> potAddDto)
        {
            try
            {
                ItemVariants<Product, Pot> pot = _mapper.Map<ItemVariants<Product, Pot>>(potAddDto);

                var createdPot = await _potService.Create(pot);
                var potGetDto = _mapper.Map<ItemVariants<ProductGetDto, PotGetDto>>(createdPot);

                return Ok(potGetDto);
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
        public async Task<IActionResult> Update(int productId, ItemVariants<ProductUpdateDto, PotUpdateDto> potUpdateDto)
        {
            try
            {
                ItemVariants<Product, Pot> pot = _mapper.Map<ItemVariants<Product, Pot>>(potUpdateDto);
                pot.Item.Id = productId;
                pot.Item.Type = ProductType.Pot;
                var updatedPot = await _potService.Update(pot);
                var potGetDto = _mapper.Map<ItemVariants<ProductGetDto, PotGetDto>>(updatedPot);

                return Ok(potGetDto);
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
