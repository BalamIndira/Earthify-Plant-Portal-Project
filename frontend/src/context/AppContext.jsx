// src/context/AppContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log("AppContext loaded");
  }, []);

  // Auth functions
  const register = (user) => setUsers([...users, user]);
  const login = (user) => setAuthUser(user);
  const logout = () => setAuthUser(null);

  // Product functions
  const addProduct = (product) =>
    setProducts([...products, { ...product, id: Date.now() }]);
  const updateProduct = (id, updates) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  // Order functions
  const addOrder = (order) =>
    setOrders([...orders, { ...order, id: Date.now(), status: "placed" }]);
  const updateOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  // Feedback functions
  const addFeedback = ({ role, source, message }) => {
    setFeedbacks((prev) => [
      ...prev,
      {
        id: Date.now(),
        role,
        source,
        message,
        status: "unsolved", 
        solvedBy: null,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const markSolved = (id, user) => {
    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "solved", solvedBy: user } : f
      )
    );
  };

  const markUnsolved = (id) => {
    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "unsolved", solvedBy: null } : f
      )
    );
  };

  const deleteFeedback = (id) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        users,
        products,
        orders,
        feedbacks,
        authUser,
        register,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addFeedback,
        markSolved,
        markUnsolved,
        deleteFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
