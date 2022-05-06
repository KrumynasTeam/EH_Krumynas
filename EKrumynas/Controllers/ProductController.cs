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
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public IList<ProductGetDto> GetAll()
        {
            var products = _productService.GetAll();
            var productGetDtos = _mapper.Map<List<ProductGetDto>>(products);

            return productGetDtos ?? new List<ProductGetDto>();
        }

        [HttpGet]
        [Route("{id}")]
        public ProductGetDto GetById(int id)
        {
            var product = _productService.GetById(id);
            var productGetDto = _mapper.Map<ProductGetDto>(product);

            return productGetDto ?? new ProductGetDto();
        }

        [HttpDelete]
        [Route("{id}")]
        public ProductGetDto DeleteById(int id)
        {
            var product = _productService.DeleteById(id);
            var productGetDto = _mapper.Map<ProductGetDto>(product);

            return productGetDto ?? new ProductGetDto();
        }

        [HttpPost]
        public IActionResult Create(ProductAddDto productAddDto)
        {
            Product product = _mapper.Map<Product>(productAddDto);
            var createdProduct = _productService.Create(product);
            return Ok(createdProduct);
        }
    }
}
