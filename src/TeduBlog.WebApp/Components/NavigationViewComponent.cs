using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using TeduBlog.Core.Repositories;
using TeduBlog.Core.SeedWorks;
using TeduBlog.WebApp.Models;

namespace TeduBlog.WebApp.Components
{
    public class NavigationViewComponent : ViewComponent
    {
        private readonly IUnitOfWork _uniOfWork;
        public NavigationViewComponent(IUnitOfWork unitOfWork)
        {
            _uniOfWork = unitOfWork;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = await _uniOfWork.PostCategories.GetAllAsync();
            var navItems = model.Select(x => new NavigationItemViewModel()
            {
                Slug = x.Slug,
                Name = x.Name,
                Children = model.Where(x => x.ParentId == x.Id).Select(i => new NavigationItemViewModel() 
                {
                    Name = x.Name,
                    Slug = x.Slug
                }).ToList()
            }).ToList() ;
            return View(navItems);
        }
    }
}
