import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Book {
  bookID: number;
  title: string;
  author: string;
  category: string;
  price: number;
}

interface CartItem extends Book {
  quantity: number;  // Ensure CartItem includes quantity
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [pageNum, setPageNum] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const pageLength = 10;

  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [selectedCategory, pageNum]);

  const fetchBooks = async () => {
    const res = await fetch(
      `/Book?pageLength=${pageLength}&pageNum=${pageNum}&category=${selectedCategory}`
    );
    const data = await res.json();
    setBooks(data.Books);
    setTotalBooks(data.TotalBooks);
  };

  const fetchCategories = async () => {
    const res = await fetch("/BookCategories");
    const data = await res.json();
    setCategories(["All", ...data]);
  };

  const handleContinueShopping = () => {
    const currentPage = window.location.pathname;
    sessionStorage.setItem("lastPage", currentPage);
    navigate(-1); // Go back to the previous page
  };

  const handleAddToCart = (book: Book) => {
    // Create a CartItem with a quantity of 1 when adding the book to the cart
    const cartItem: CartItem = { ...book, quantity: 1 };
    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="container">
      <div className="cart-summary">
        <h4>Cart: {totalItems} items (${totalPrice})</h4>
        <Link to="/cart">View Cart</Link>
      </div>

      <button onClick={handleContinueShopping} className="btn btn-secondary">
        Continue Shopping
      </button>

      <h2 className="my-3">Book List</h2>

      {/* Category Filter Dropdown */}
      <div className="mb-3">
        <label className="form-label">Filter by Category:</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPageNum(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      <div className="row">
        {books.map((book) => (
          <div key={book.bookID} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{book.title}</h5>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Price: ${book.price.toFixed(2)}</p>
              <button className="btn btn-primary" onClick={() => handleAddToCart(book)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast show" role="alert">
          <div className="toast-body">Added to Cart!</div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={pageNum === 1}
          onClick={() => setPageNum((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>Page {pageNum}</span>
        <button
          className="btn btn-secondary"
          disabled={pageNum * pageLength >= totalBooks}
          onClick={() => setPageNum((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <Link to="/cart" className="btn btn-primary mt-3">
        Cart <span className="badge bg-primary">{totalItems}</span>
      </Link>
    </div>
  );
};

export default BookList;
