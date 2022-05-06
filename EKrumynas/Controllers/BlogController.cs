using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EKrumynas.Services;
using Microsoft.AspNetCore.Routing;

namespace EKrumynas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public IList<BlogPost> GetAll()
        {
            var blogs = _blogService.GetAll();

            return blogs ?? new List<BlogPost>();
        }
        
        [HttpGet]
        [Route("{id}")]
        public BlogPost GetById(int id)
        {
            var blog = _blogService.GetById(id);

            return blog ?? new BlogPost();
        }

        [HttpPost]
        public IActionResult Create(BlogPost blog)
        {
            var createdBlog = _blogService.Create(blog);
            return Ok(createdBlog);
        }
    }
}