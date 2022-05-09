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
        private readonly IMapper _mapper;

        public PotController(IPotService potService, IMapper mapper)
        {
            _potService = potService;
            _mapper = mapper;
        }

        [HttpGet]
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

        [HttpGet]
        [Route("variant")]
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
        [Route("variant/{productId}")]
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
    }
}
