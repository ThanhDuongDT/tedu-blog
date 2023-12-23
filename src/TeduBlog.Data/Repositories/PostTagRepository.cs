using Microsoft.EntityFrameworkCore;
using TeduBlog.Core.Domain.Content;
using TeduBlog.Core.Repositories;
using TeduBlog.Data.SeedWorks;

namespace TeduBlog.Data.Repositories
{
    public class PostTagRepository : RepositoryBase<PostTag, Guid>, IPostTagRepository
    {
        public PostTagRepository(TeduBlogContext context) : base(context)
        {
        }

        public async Task<PostTag> GetTagByPostId(Guid postId, Guid tagId) => 
            await _context.PostTags.FirstOrDefaultAsync(pt => pt.PostId == postId && pt.TagId == tagId);
    }

}
