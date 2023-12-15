using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduBlog.Core.Domain.Content;
using TeduBlog.Core.Repositories;
using TeduBlog.Data.SeedWorks;

namespace TeduBlog.Data.Repositories
{
    public class TagRepository : RepositoryBase<Core.Domain.Content.Tag, Guid>, ITagRepository
    {
        public TagRepository(TeduBlogContext context) : base(context) 
        {
            
        }
        public async Task<Tag?> GetBySlug(string slug)
        {
            return await _context.Tags.FirstOrDefaultAsync(x => x.Slug == slug);
        }
    }
}
