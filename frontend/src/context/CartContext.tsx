import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];                          
  addToCart: (item: CartItem) => void;      // add or update
  removeFromCart: (bookId: number) => void; // remove from  cart
  clearCart: () => void;                    // clear the cart
}

// Create the context (initially undefined)
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); 
  
  const getValidBookID = (bookID: string | number): number => {
    return typeof bookID === 'string' ? parseInt(bookID, 10) : bookID;
  };

  const addToCart = (item: CartItem) => {
    const validBookID = getValidBookID(item.bookID);

    if (isNaN(validBookID)) {
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === validBookID);

      if (existingItem) {
        return prevCart.map((c) =>
          c.bookID === validBookID
            ? {
                ...c,
                quantity: c.quantity + item.quantity,
                subtotal: (c.quantity + item.quantity) * c.price,
              }
            : c
        );
      } else {
        return [
          ...prevCart,
          {
            ...item,
            bookID: validBookID,
            subtotal: item.quantity * item.price,  // calculate subtotal 
          },
        ];
      }
    });
  };
    
  // remove book w ID
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  // clears cart
  const clearCart = () => {
    setCart(() => []);
  };

  // Provide the cart state and functions to any children components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
