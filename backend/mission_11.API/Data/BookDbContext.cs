using Microsoft.EntityFrameworkCore;

namespace mission_11.api.Data;

public class BookDbContext: DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    public DbSet<Books> Books { get; set; }
}