using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using mission_11.api.Data;
using System.Linq;

namespace mission_11.api.Controllers
{
    [Route("")]
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
        
        
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Books newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Books updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;


            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }

    }

}