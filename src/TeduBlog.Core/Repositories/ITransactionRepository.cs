using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduBlog.Core.Models;
using TeduBlog.Core.Models.Royalty;
using TeduBlog.Core.SeedWorks;
using TeduBlog.Core.Domain.Royalty;


namespace TeduBlog.Core.Repositories
{
    public interface ITransactionRepository : IRepository<Transaction, Guid> // Guid? thì sẽ bị lỗi ở TransactionRepository TeduBlog.Data.Repositories
    {
        Task<PagedResult<TransactionDto>> GetAllPaging(string? userName,
            int fromMonth, int fromYear, int toMonth , int toYear, int pagedIndex = 1, int pageSize = 10);
    }
}

