import { createContext, useContext, useState, useCallback } from "react";
import {
  addToCart as apiAddToCart,
  getCart as apiGetCart,
  updateCartQuantity as apiUpdateCartQuantity,
  removeFromCart as apiRemoveFromCart,
} from "../api/client";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]); // populated cart.items from backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const refreshCart = useCallback(async (silent = false) => {
  if (!user) {
    setItems([]);
    return;
  }
  if (!silent) setLoading(true);
  setError(null);
  try {
    const res = await apiGetCart();
    setItems(res.data.cart?.items || []);
  } catch (err) {
    setItems([]);
  } finally {
    if (!silent) setLoading(false);
  }
}, [user]);

  const addItem = async (sareeId, quantity = 1) => {
    await apiAddToCart(sareeId, quantity);
    await refreshCart(true);
  };


  const changeQuantity = async (sareeId, delta) => {
  await apiUpdateCartQuantity(sareeId, delta);
  await refreshCart(true);
};

  const removeItem = async (sareeId) => {
    await apiRemoveFromCart(sareeId);
    await refreshCart(true);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        itemCount,
        refreshCart,
        addItem,
        changeQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
