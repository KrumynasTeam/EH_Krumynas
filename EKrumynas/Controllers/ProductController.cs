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
        public async Task<IList<ProductGetDto>> GetAll()
        {
            try
            {
                var products = await _productService.GetAll();
                var productGetDtos = _mapper.Map<List<ProductGetDto>>(products);

                return productGetDtos ?? new List<ProductGetDto>();
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
        public async Task<ProductGetDto> GetById(int id)
        {
            try
            {
                var product = await _productService.GetById(id);
                var productGetDto = _mapper.Map<ProductGetDto>(product);

                return productGetDto ?? new ProductGetDto();
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
        public async Task<ProductGetDto> DeleteById(int id)
        {
            try
            {
                var product = await _productService.DeleteById(id);
                var productGetDto = _mapper.Map<ProductGetDto>(product);

                return productGetDto ?? new ProductGetDto();
            }
            catch (ArgumentException)
            {
                throw new ApiException(
                    statusCode: 400,
                    message: "Incorrect request data");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductAddDto productAddDto)
        {
            try
            {
                Product product = _mapper.Map<Product>(productAddDto);
                var createdProduct = await _productService.Create(product);
                var productGetDto = _mapper.Map<ProductGetDto>(createdProduct);

                return Ok(productGetDto);
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
