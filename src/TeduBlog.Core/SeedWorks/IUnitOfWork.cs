using TeduBlog.Core.Repositories;

namespace TeduBlog.Core.SeedWorks
{
    public interface IUnitOfWork
    {
        IPostRepository Posts { get; }
        IPostCategoryRepository PostCategories { get; }
        IPostTagRepository PostTags { get; }
        ISeriesRepository Series { get; }
        ITransactionRepository Transactions { get; }
        IUserRepository Users { get; }
        ITagRepository Tags { get; }

        Task<int> CompleteAsync();
    }
}