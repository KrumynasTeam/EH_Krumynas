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
        public IList<BouquetGetDto> GetAll()
        {
            var bouquets = _bouquetService.GetAll();
            var bouquetGetDtos = _mapper.Map<List<BouquetGetDto>>(bouquets);

            return bouquetGetDtos ?? new List<BouquetGetDto>();
        }

        [HttpGet]
        [Route("{id}")]
        public BouquetGetDto GetById(int id)
        {
            var bouquet = _bouquetService.GetById(id);
            var bouquetGetDto = _mapper.Map<BouquetGetDto>(bouquet);

            return bouquetGetDto ?? new BouquetGetDto();
        }

        [HttpDelete]
        [Route("{id}")]
        public BouquetGetDto DeleteById(int id)
        {
            var bouquet = _bouquetService.DeleteById(id);
            var bouquetGetDto = _mapper.Map<BouquetGetDto>(bouquet);

            return bouquetGetDto ?? new BouquetGetDto();
        }

        [HttpPost]
        public IActionResult Create(BouquetAddDto bouquetAddDto)
        {
            Bouquet bouquet = _mapper.Map<Bouquet>(bouquetAddDto);
            var createdBouquet = _bouquetService.Create(bouquet);
            return Ok(createdBouquet);
        }
    }
}
