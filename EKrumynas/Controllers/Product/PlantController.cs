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
    public class PlantController : ControllerBase
    {
        private readonly IPlantService _plantService;
        private readonly IMapper _mapper;

        public PlantController(IPlantService plantService, IMapper mapper)
        {
            _plantService = plantService;
            _mapper = mapper;
        }
    /*
        [HttpGet]
        public async Task<IList<PlantGetDto>> GetAll()
        {
            try
            {
                var plants = await _plantService.GetAll();
                var plantGetDtos = _mapper.Map<List<PlantGetDto>>(plants);

                return plantGetDtos ?? new List<PlantGetDto>();
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
        public async Task<PlantGetDto> GetById(int id)
        {
            try
            {
                var plant = await _plantService.GetById(id);
                var plantGetDto = _mapper.Map<PlantGetDto>(plant);

                return plantGetDto ?? new PlantGetDto();
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
        [Route("{productId}")]
        public async Task<ItemVariants<ProductGetDto, PlantGetDto>> DeleteByProductId(int productId)
        {
            try
            {
                var plant = await _plantService.DeleteByProductId(productId);
                var plantGetDto = _mapper.Map<ItemVariants<ProductGetDto, PlantGetDto>>(plant);

                return plantGetDto ?? new ItemVariants<ProductGetDto, PlantGetDto>();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(ItemVariants<ProductAddDto, PlantAddDto> plantAddDto)
        {
            try
            {
                ItemVariants<Product, Plant> plant = _mapper.Map<ItemVariants<Product, Plant>>(plantAddDto);

                var createdPlant = await _plantService.Create(plant);
                var plantGetDto = _mapper.Map<ItemVariants<ProductGetDto, PlantGetDto>>(createdPlant);

                return Ok(plantGetDto);
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
        public async Task<IActionResult> Update(int productId, ItemVariants<ProductUpdateDto, PlantUpdateDto> plantUpdateDto)
        {
            try
            {
                ItemVariants<Product, Plant> plant = _mapper.Map<ItemVariants<Product, Plant>>(plantUpdateDto);
                plant.Item.Id = productId;
                plant.Item.Type = ProductType.Plant;
                var updatedPlant = await _plantService.Update(plant);
                var plantGetDto = _mapper.Map<ItemVariants<ProductGetDto, PlantGetDto>>(updatedPlant);

                return Ok(plantGetDto);
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
                var variants = await _plantService.GetAllByProduct();
                List<ItemVariants<ProductGetDto, PlantGetDto>> variantsDtos =
                    _mapper.Map<List<ItemVariants<ProductGetDto, PlantGetDto>>>(variants);

                return Ok(variantsDtos ?? new List<ItemVariants<ProductGetDto, PlantGetDto>>());
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
                var variants = await _plantService.GetByProductId(productId);
                ItemVariants<ProductGetDto, PlantGetDto> variantsDtos =
                    _mapper.Map<ItemVariants<ProductGetDto, PlantGetDto>>(variants);

                return Ok(variantsDtos ?? new ItemVariants<ProductGetDto, PlantGetDto>());
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
