import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce((sum, item) => {
    return sum + (item.subtotal || 0);
  }, 0);

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  if (cart.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>{totalQuantity} item{totalQuantity !== 1 ? 's' : ''}</strong> – ${totalAmount.toFixed(2)}
    </div>
  );
};

export default CartSummary;
