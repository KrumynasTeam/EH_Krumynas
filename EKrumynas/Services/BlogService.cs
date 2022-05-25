using System.Collections.Generic;
using System.Linq;
using EKrumynas.Data;
using EKrumynas.Models;

namespace EKrumynas.Services;

public class BlogService : IBlogService
{
    private readonly EKrumynasDbContext _context;

    public BlogService(EKrumynasDbContext context)
    {
        _context = context;
    }

    public IList<BlogPost> GetAll()
    {
        return _context.BlogPosts.ToList();
    }

    public BlogPost GetById(int id)
    {
        return _context.BlogPosts
            .FirstOrDefault(b => b.Id == id);
    }

    public BlogPost Create(BlogPost blog)
    {
        _context.BlogPosts.Add(blog);
        _context.SaveChanges();
        return blog;
    }

    public BlogPost Update(BlogPost blog)
    {
        _context.BlogPosts.Update(blog);
        _context.SaveChanges();
        return blog;
    }

    public BlogPost Delete(BlogPost blog)
    {
        _context.BlogPosts.Remove(blog);
        _context.SaveChanges();
        return blog;
    }

    public IList<BlogPost> GetNewestBlogs()
    {
        var allBlogs = _context.BlogPosts;
        var result = allBlogs.OrderByDescending(t => t.CreatedAt);
        return result.Take(3).ToList();
    }
}