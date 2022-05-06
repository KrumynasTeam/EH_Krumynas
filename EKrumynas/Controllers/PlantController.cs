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
        public IList<PlantGetDto> GetAll()
        {
            var plants = _plantService.GetAll();
            var plantGetDtos = _mapper.Map<List<PlantGetDto>>(plants);

            return plantGetDtos ?? new List<PlantGetDto>();
        }

        [HttpGet]
        [Route("{id}")]
        public PlantGetDto GetById(int id)
        {
            var plant = _plantService.GetById(id);
            var plantGetDto = _mapper.Map<PlantGetDto>(plant);

            return plantGetDto ?? new PlantGetDto();
        }

        [HttpDelete]
        [Route("{id}")]
        public PlantGetDto DeleteById(int id)
        {
            var plant = _plantService.DeleteById(id);
            var plantGetDto = _mapper.Map<PlantGetDto>(plant);

            return plantGetDto ?? new PlantGetDto();
        }

        [HttpPost]
        public IActionResult Create(PlantAddDto plantAddDto)
        {
            Plant plant = _mapper.Map<Plant>(plantAddDto);
            var createdPlant = _plantService.Create(plant);
            return Ok(createdPlant);
        }
    }
}
