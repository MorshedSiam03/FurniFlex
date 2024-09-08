import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Assuming AuthProvider provides user details

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the current user
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data based on the user's email
  const updateCartItems = (email) => {
    if (email) {
      fetch(`https://furni-flex-server-fawn.vercel.app/cart?email=${email}`)
        .then((res) => res.json())
        .then((data) => setCartItems(data.filter(item => item.email === email)))
        .catch((err) => console.error("Failed to fetch cart data", err));
    }
  };

  // Fetch cart data whenever the user changes or on component mount
  useEffect(() => {
    if (user?.email) {
      updateCartItems(user.email);
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
