import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  console.log('Cart items in CartPage:', cart);

  // calc total
  const overallTotal = cart.reduce((sum, item) => {
    console.log('Item subtotal:', item.subtotal); 
    return sum + item.subtotal;
  }, 0);

  // Function to handle item removal and show the toast
  const handleRemoveFromCart = (bookID: number) => {
    removeFromCart(bookID);
    setShowToast(true);  // Show the toast notification
    setTimeout(() => setShowToast(false), 3000);  // Hide toast after 3 seconds
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item: CartItem) => (
            <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h4>{item.title}</h4>
                <p>Price per book: <strong>${item.price.toFixed(2)}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <p>Total for this book: <strong>${item.subtotal.toFixed(2)}</strong></p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveFromCart(item.bookID)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        {cart.length > 0 && (
          <h3>Cart Subtotal: <strong>${overallTotal.toFixed(2)}</strong></h3>
        )}
      </div>

      <div className="mt-3">
        <button className="btn btn-primary mr-2" disabled={cart.length === 0}>
          Checkout
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>

      {/* Toast Notification positioned in the top-right corner */}
      {showToast && (
        <div
          className="toast show position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div className="toast-header">
            <strong className="me-auto">Cart Update</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">
            Item removed successfully!
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
