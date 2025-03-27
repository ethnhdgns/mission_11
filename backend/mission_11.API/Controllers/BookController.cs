using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using mission_11.api.Data;

namespace mission_11.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        public BookController(BookDbContext bookContext) => _bookContext = bookContext;

        [HttpGet]
        public OkObjectResult Get(int pageLength, int pageNum, string? category = "All")
        {
            HttpContext.Response.Cookies.Append("FavoriteCategory", "Historical", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });

            var query = _bookContext.Books.AsQueryable();

            // Apply category filter if not "All"
            if (!string.IsNullOrEmpty(category) && category != "All")
            {
                query = query.Where(b => b.Category == category);
            }

            var totalNumBooks = query.Count();
            var books = query
                .Skip((pageNum - 1) * pageLength)
                .Take(pageLength)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalBooks = totalNumBooks
            });
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Where(c => c != null)
                .Distinct()
                .ToList();

            return Ok(categories);
        }

    }
}