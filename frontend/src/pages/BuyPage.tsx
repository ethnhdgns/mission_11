import { useState } from "react";
import WelcomeBand from "../components/WelcomeBand";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";

function BuyPage() {
  const navigate = useNavigate();
  const { title, price, bookID, author } = useParams();
  const { addToCart } = useCart();
  console.log("Params:", { title, price, bookID, author });

  const parsedPrice = price ? parseFloat(price) : 0;
  const bookIdAsNumber = Number(bookID);

  if (isNaN(bookIdAsNumber)) {
    return;
  }

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress bar percentage

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: bookIdAsNumber,
      title: title || "No Book Found",
      price: parsedPrice,
      quantity: quantity,
      subtotal: parsedPrice * quantity,
    };

    addToCart(newItem);
    
    setLoading(true);
    let progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => navigate('/cart'), 500); // Redirect to CartPage after loading
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200); 
  };

  return (
    <div className="container mt-5">
      <WelcomeBand />
      <h2 className="text-center mb-4">
        Purchase <i>{title}</i> by <strong>{author}</strong>
      </h2>

      <div className="d-flex justify-content-center">
        <div className="card mb-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">By {author}</p>
            <p className="card-text">
              Price: <strong>${parsedPrice.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control"
          />
        </div>

        <div className="mt-3">
          <button
            className="btn btn-primary custom-btn"
            onClick={handleAddToCart}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Adding to Cart..." : "Add to Cart"}
          </button>
          <button
            className="btn btn-secondary ms-2 custom-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
        
        {/* Show loading progress bar if loading */}
        {loading && (
          <div className="mt-3">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {progress}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyPage;
