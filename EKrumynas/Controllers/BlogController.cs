using EKrumynas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EKrumynas.Services;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;

namespace EKrumynas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        [Authorize(Roles = "USER")]
        public IList<BlogPost> GetAll()
        {
            var blogs = _blogService.GetAll();

            return blogs ?? new List<BlogPost>();
        }
        
        [HttpGet]
        [Route("GetNewestBlogs")]
        [Authorize(Roles = "USER")]
        public IList<BlogPost> GetNewestBlogs()
        {
            var blogs = _blogService.GetNewestBlogs();

            return blogs ?? new List<BlogPost>();
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "USER")]
        public BlogPost GetById(int id)
        {
            var blog = _blogService.GetById(id);

            return blog ?? new BlogPost();
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public IActionResult Create(BlogPost blog)
        {
            var createdBlog = _blogService.Create(blog);
            return Ok(createdBlog);
        }
        
        [HttpPut]
        [Authorize(Roles = "ADMIN")]
        public IActionResult Update(BlogPost blog)
        {
            var updatedBlog = _blogService.Update(blog);
            return Ok(updatedBlog);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult Delete(int id)
        {
            var blog = _blogService.GetById(id);

            if (blog == null)
            {
                return NotFound();
            }

            _blogService.Delete(blog);
            return Ok();
        }
    }
}