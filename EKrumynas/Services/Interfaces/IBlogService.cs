using System.Collections.Generic;
using EKrumynas.Models;

namespace EKrumynas.Services;

public interface IBlogService
{
    IList<BlogPost> GetAll();
    BlogPost GetById(int id);
    BlogPost Create(BlogPost blog);
    BlogPost Delete(BlogPost blog);
}