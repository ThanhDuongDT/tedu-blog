﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeduBlog.Api.Extensions;
using TeduBlog.Core.Domain.Royalty;
using TeduBlog.Core.Models;
using TeduBlog.Core.Models.Royalty;
using TeduBlog.Core.SeedWorks;
using TeduBlog.Core.Service;
using static TeduBlog.Core.SeedWorks.Constants.Permissions;

namespace TeduBlog.Api.Controllers.AdminApi
{
    [Route("api/admin/royalty")]
    [ApiController]
    public class RoyaltyController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoyaltyService _RoyaltyService;
        public RoyaltyController(IUnitOfWork unitOfWork, IRoyaltyService royaltyService)
        {
            _unitOfWork = unitOfWork;
            _RoyaltyService = royaltyService;
        }
        [HttpGet]
        [Route("transaction-histories")]
        [Authorize(Royalty.View)]
        public async Task<ActionResult<PagedResult<TransactionDto>>> GetTransactionHistory(string? keyword,
            int fromMonth, int fromYear, int toMonth, int toYear,
            int pagedIndex, int pagedSize = 10)
        {
            var result = await _unitOfWork.Transactions.GetAllPaging(keyword, fromMonth, fromYear, toMonth, toYear, pagedIndex, pagedSize);
            return Ok(result);
        }
        [HttpGet]
        [Route("Royalty-report-by-user")]
        [Authorize(Royalty.View)]
        public async Task<ActionResult<PagedResult<RoyaltyReportByUserDto>>> GetRoyaltyReportByUser(Guid? userId,
            int fromMonth, int fromYear, int toMonth, int toYear)
        {
            var result = await _RoyaltyService.GetRoyaltyReportByUserAsync(userId, fromMonth, fromYear, toMonth, toYear);
            return Ok(result);
        }
        [HttpGet]
        [Route("Royalty-report-by-month")]
        [Authorize(Royalty.View)]
        public async Task<ActionResult<PagedResult<RoyaltyReportByMonthDto>>> GetRoyaltyReportByMonth(Guid? userId,
            int fromMonth, int fromYear, int toMonth, int toYear)
        {
            var result = await _RoyaltyService.GetRoyaltyReportByMonthAsync(userId, fromMonth, fromYear, toMonth, toYear);
            return Ok(result);
        }
        [HttpPost]
        [Route("{userId}")]
        [Authorize(Royalty.Pay)]
        public async Task<IActionResult> PayRoyalty(Guid userId)
        {
            var fromUserId = User.GetUserId();
            await _RoyaltyService.PayRoyaltyForUserAsync(fromUserId, userId);
            return Ok();
        }
    }
}
