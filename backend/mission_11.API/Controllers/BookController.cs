using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using mission_11.api.Data;
using System.Linq;

namespace mission_11.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        public BookController(BookDbContext bookContext)
        {
            _bookContext = bookContext;
        }

        // Existing endpoint for getting paginated books
        [HttpGet]
        public IActionResult Get(int pageLength, int pageNum)
        {
            var books = _bookContext.Books
                .Skip((pageNum - 1) * pageLength)
                .Take(pageLength)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = books,
                TotalBooks = totalNumBooks
            });
        }

        // New endpoint for fetching all books
        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize, int pageNum, [FromQuery] List<string>? bookCategories = null)
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply category filter if categories are provided
            if (bookCategories != null &&  bookCategories.Any())
            {
                booksQuery = booksQuery.Where(b => bookCategories.Contains(b.Category));
            }

            var totalNumBooks = booksQuery.Count();
            
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalNumBooks
            });
        }

        // Endpoint for getting book categories
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
        // GET books/{id}
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == id);

            if (book == null)
            {
                return NotFound(); // Return 404 if the book is not found
            }

            return Ok(book); // Return the book data if found
        }


    }

}