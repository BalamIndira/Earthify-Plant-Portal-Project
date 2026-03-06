import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const STORAGE_KEY = "cartItems";

const getId = (p) => p?.id || p?._id || p?.productId;

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      console.warn("Failed to load cart from storage", e);
    }
  }, []);

  // persist on items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to persist cart to storage", e);
    }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    const pid = getId(product);
    if (!pid) return;
    setItems((prev) => {
      const idx = prev.findIndex((it) => getId(it) === pid);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 0) + qty };
        return next;
      }
      return [...prev, { ...product, qty: Math.max(1, qty), productId: pid }];
    });
  };

  const incrementQty = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        getId(it) === id ? { ...it, qty: (it.qty || 0) + 1 } : it
      )
    );
  };

  const decrementQty = (id) => {
    setItems((prev) =>
      prev
        .map((it) =>
          getId(it) === id ? { ...it, qty: (it.qty || 1) - 1 } : it
        )
        .filter((it) => (it.qty || 0) > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => getId(it) !== id));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((s, it) => s + (it.qty || 0), 0);
  const total = items.reduce((s, it) => {
    const price = Number(it.price ?? it.amount ?? 0);
    const qty = Number(it.qty ?? 0);
    return s + price * qty;
  }, 0);

  const cart = { items, count, total };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        incrementQty,
        decrementQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
