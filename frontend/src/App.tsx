import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BuyPage from './pages/BuyPage';
import BookList from './pages/BookList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/buy/:title/:bookID/:price/:author" element={<BuyPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;