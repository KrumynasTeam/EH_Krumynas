using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EKrumynas.Services;
using EKrumynas.DTOs;
using AutoMapper;

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
        public IList<PotGetDto> GetAll()
        {
            var pots = _potService.GetAll();
            var potGetDtos = _mapper.Map<List<PotGetDto>>(pots);

            return potGetDtos ?? new List<PotGetDto>();
        }

        [HttpGet]
        [Route("{id}")]
        public PotGetDto GetById(int id)
        {
            var pot = _potService.GetById(id);
            var potGetDto = _mapper.Map<PotGetDto>(pot);

            return potGetDto ?? new PotGetDto();
        }

        [HttpDelete]
        [Route("{id}")]
        public PotGetDto DeleteById(int id)
        {
            var pot = _potService.DeleteById(id);
            var potGetDto = _mapper.Map<PotGetDto>(pot);

            return potGetDto ?? new PotGetDto();
        }

        [HttpPost]
        public IActionResult Create(PotAddDto potAddDto)
        {
            Pot pot = _mapper.Map<Pot>(potAddDto);
            var createdPot = _potService.Create(pot);
            return Ok(createdPot);
        }
    }
}
