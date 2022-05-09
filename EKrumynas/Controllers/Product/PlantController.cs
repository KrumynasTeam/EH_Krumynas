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

        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<PlantGetDto> DeleteById(int id)
        {
            try
            {
                var plant = await _plantService.DeleteById(id);
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

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(PlantAddDto plantAddDto)
        {
            try
            {
                Plant plant = _mapper.Map<Plant>(plantAddDto);
                var createdPlant = await _plantService.Create(plant);
                var plantGetDto = _mapper.Map<PlantGetDto>(createdPlant);

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
        [Route("{id}")]
        public async Task<IActionResult> Update(int id, PlantAddDto plantAddDto)
        {
            try
            {
                Plant plant = _mapper.Map<Plant>(plantAddDto);
                plant.Id = id;
                var updatedPlant = await _plantService.Update(plant);
                var plantGetDto = _mapper.Map<ProductGetDto>(updatedPlant);

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
        [Route("variant")]
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
        [Route("variant/{productId}")]
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
