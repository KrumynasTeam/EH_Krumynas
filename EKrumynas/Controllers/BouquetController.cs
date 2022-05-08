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

        [HttpDelete, Authorize(Roles = "ADMIN")]
        [Route("{id}")]
        public async Task<BouquetGetDto> DeleteById(int id)
        {
            try
            {
                var bouquet = await _bouquetService.DeleteById(id);
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

        [HttpPost, Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create(BouquetAddDto bouquetAddDto)
        {
            try
            {
                Bouquet bouquet = _mapper.Map<Bouquet>(bouquetAddDto);
                var createdBouquet = await _bouquetService.Create(bouquet);
                var bouquetGetDto = _mapper.Map<BouquetGetDto>(createdBouquet);

                return Ok(bouquetGetDto);
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
