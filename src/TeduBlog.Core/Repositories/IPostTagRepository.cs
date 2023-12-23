using TeduBlog.Core.Domain.Content;
using TeduBlog.Core.SeedWorks;

namespace TeduBlog.Core.Repositories
{
    public interface IPostTagRepository : IRepository<PostTag, Guid>
    {
        Task<PostTag> GetTagByPostId(Guid postId, Guid tagId);
    }
}
