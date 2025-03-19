import { useEffect, useState } from "react";
import { Book } from './types/Book';

function BookList(){
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`http://localhost:5079/Book?pageLength=${pageSize}&pageNum=${pageNum}`, 
            {
                credentials: "include"
            }
        );
            const data = await response.json();
            setBooks(data.books);
            setTotalBooks(data.totalBooks);
            setTotalPages(Math.ceil(data.totalBooks / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum, totalBooks]);

    // Sorting function
    const sortBooksByTitle = () => {
        const sortedBooks = [...books].sort((a, b) => {
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        });
        setBooks(sortedBooks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <>
        <h1>Books</h1>
        <br />

        {/* sorting button */}
        <button onClick={sortBooksByTitle} style={{ marginBottom: "20px" }}>
            Sort by Project Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>

        {books.map((b) => (
        <div id='bookCard' className="card" key={b.bookID}>
            <h3 className="card-title text-success">{b.title}</h3>
            <div className="card-body">
                <ul className="list-unstyled">
                    <li><strong>Author: </strong>{b.author}</li>
                    <li><strong>Publisher: </strong>{b.publisher}</li>
                    <li><strong>ISBN: </strong>{b.isbn}</li>
                    <li><strong>Category: </strong>{b.category}</li>
                    <li><strong>Pages: </strong>{b.pageCount}</li>
                    <li><strong>Price: </strong>{b.price}</li>
                </ul>
            </div>
        </div>
        ))}

        <br/>

        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === i + 1}>
                {i + 1}
            </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br/>
        <label>
            Results per page: 
            <select 
                value={pageSize} 
                onChange={(x) => {
                    setPageSize(Number(x.target.value));
                    setPageNum(1);
                }}
                >
                <option value="5"> 5</option>
                <option value="10"> 10</option>
                <option value="15"> 15</option>
            </select>
        </label>
        </>
    );
}

export default BookList;
