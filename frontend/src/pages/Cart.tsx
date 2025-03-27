import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.bookID}>
                {item.title} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
