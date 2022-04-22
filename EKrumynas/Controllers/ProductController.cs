using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EKrumynas.Services;

namespace EKrumynas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        //TODO: add route
        public IList<Product> GetAll()
        {
            var products = _productService.GetAll();

            return products ?? new List<Product>();
        }
    }
}
