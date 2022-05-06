using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EKrumynas.Services;
using EKrumynas.DTOs;
using AutoMapper;
using System.Threading.Tasks;
using System;
using AutoWrapper.Wrappers;

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

        [HttpDelete]
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

        [HttpPost]
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
    }
}
