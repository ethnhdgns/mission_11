using System.ComponentModel.DataAnnotations;

namespace mission_11.api.Data;

public class Books
{
    [Key]
    public int BookID { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Publisher { get; set; }
    public int? ISBN { get; set; }
    public string? Category { get; set; }
    public int? PageCount { get; set; }
    public double? Price { get; set; }
}