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
        private BookDbContext _bookContext;

        // GET
        public BookController(BookDbContext poop) => _bookContext = poop;

        public OkObjectResult Get(int pageLength, int pageNum)
        {
            // IS414 COOKIES
            HttpContext.Response.Cookies.Append("FavoriteCategory", "Historical", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });
            
            var blah = _bookContext.Books
                .Skip((pageNum - 1) * pageLength)
                .Take(pageLength)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = blah,
                TotalBooks = totalNumBooks
            });
        }
            
    }
}