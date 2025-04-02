import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookCards({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    const loadBooks = async () => {
       try{
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories)

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); 
       } catch(error) {
        setError((error as Error).message)
       } finally{
        setLoading(false);
       }
      };
      
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);
  
  if (loading) return <p>Loading books...</p>
  if (error) return <p className='text-red-500'>Error: {error}</p>
  return (
    <>
      {books.map((p) => (
        <div id="bookCard" className="card" key={p.bookID}>
          <h3 className="card-title">{p.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {p.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {p.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {p.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {p.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {p.category}
              </li>
              <li>
                <strong>Pages: </strong>
                {p.pageCount}
              </li>
              <strong>Price: </strong>
              {p.price}
            </ul>
            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${p.title}/${p.bookID}/${p.price}/${p.author}`)}
            >
              Buy
            </button>
          </div>

        </div>
      ))}
      <Pagination
        currentPage={pageNum} 
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookCards;