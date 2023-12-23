using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TeduBlog.Core.Domain.Identity;
using TeduBlog.Core.Repositories;
using TeduBlog.Core.SeedWorks;
using TeduBlog.Data.Repositories;
using static TeduBlog.Core.SeedWorks.Constants.Permissions;

namespace TeduBlog.Data.SeedWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TeduBlogContext _context;

        public UnitOfWork(TeduBlogContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            Posts = new PostRepository(context, mapper, userManager);
            PostCategories = new PostCategoryRepository(context, mapper);
            Series = new SeriesRepository(context, mapper);
            Transactions = new TransactionRepository(context, mapper);
            Users = new UserRepository(context);
            Tags = new TagRepository(context, mapper);
            PostTags = new PostTagRepository(context);
        }
        public IPostRepository Posts { get; private set; }

        public IPostCategoryRepository PostCategories { get; private set; }
        public IPostTagRepository PostTags { get; private set; }
        public ISeriesRepository Series { get; private set; }
        public ITransactionRepository Transactions { get; private set; }
        public IUserRepository Users { get; private set; }

        public ITagRepository Tags {  get; private set; }

        public async Task<int> CompleteAsync()
        {
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
