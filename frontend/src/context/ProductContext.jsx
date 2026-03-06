// frontend/src/context/ProductContext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

// Use VITE_API_URL only when explicitly provided. If not provided, do not attempt network calls.
const API = import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000";
const API_ORIGIN = API ? API.replace(/\/api\/?$/, "") : window.location.origin;

// configure axios only when API is set
if (API) {
  axios.defaults.baseURL = API;
  axios.defaults.timeout = 10000;
}

// Helper that throws when no API configured so callers fall back to localStorage
const tryRequest = async (fn) => {
  if (!API) throw new Error("No API configured");
  return fn();
};

const getDemoUserId = () => {
  let uid = localStorage.getItem("demoUserId");
  if (!uid) {
    uid = "demo-user-" + Math.random().toString(36).slice(2, 9);
    localStorage.setItem("demoUserId", uid);
  }
  return uid;
};

export const ProductProvider = ({ children }) => {
  const demoUserId = getDemoUserId();

  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  // ------------------ API helpers ------------------
  const fetchProducts = async () => {
    try {
      const res = await tryRequest(() => axios.get("/products"));
      const data = Array.isArray(res.data) ? res.data : [];
      setProducts(data);
      try {
        localStorage.setItem("products", JSON.stringify(data));
      } catch {}
      return data;
    } catch (err) {
      // fallback to localStorage
      try {
        const local = JSON.parse(localStorage.getItem("products") || "[]");
        setProducts(Array.isArray(local) ? local : []);
        return Array.isArray(local) ? local : [];
      } catch {
        setProducts([]);
        return [];
      }
    }
  };

  const fetchWishlistFromServer = async (userId = demoUserId) => {
    try {
      const res = await tryRequest(() => axios.get(`/wishlist/${userId}`));
      const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
      setWishlist(data);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(data));
      } catch {}
      return data;
    } catch (err1) {
      // try alternative server shapes only when API exists; otherwise fall back to localStorage
      if (!API) {
        try {
          const local = JSON.parse(
            localStorage.getItem("wishlistItems") || "[]",
          );
          setWishlist(Array.isArray(local) ? local : []);
          return Array.isArray(local) ? local : [];
        } catch {
          setWishlist([]);
          return [];
        }
      }
      // network attempted but failed -> try other endpoints
      try {
        const res2 = await axios.get("/wishlist", { params: { userId } });
        const data2 = Array.isArray(res2.data)
          ? res2.data
          : res2.data?.items || [];
        setWishlist(data2);
        localStorage.setItem("wishlistItems", JSON.stringify(data2));
        return data2;
      } catch (err2) {
        try {
          const res3 = await axios.get("/wishlist");
          const arr = Array.isArray(res3.data)
            ? res3.data
            : res3.data?.items || [];
          const filtered = Array.isArray(arr)
            ? arr.filter((it) => !it.userId || it.userId === userId)
            : [];
          setWishlist(filtered);
          localStorage.setItem("wishlistItems", JSON.stringify(filtered));
          return filtered;
        } catch (err3) {
          try {
            const local = JSON.parse(
              localStorage.getItem("wishlistItems") || "[]",
            );
            setWishlist(Array.isArray(local) ? local : []);
            return Array.isArray(local) ? local : [];
          } catch {
            setWishlist([]);
            return [];
          }
        }
      }
    }
  };

  const addToWishlistApi = async (productSnapshot) => {
    try {
      const res = await tryRequest(() =>
        axios.post("/wishlist", {
          userId: demoUserId,
          product: productSnapshot,
        }),
      );
      const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
      setWishlist(data);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(data));
      } catch {}
      return data;
    } catch {
      // local fallback
      const current = Array.isArray(wishlist)
        ? [...wishlist, productSnapshot]
        : [productSnapshot];
      setWishlist(current);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(current));
      } catch {}
      return current;
    }
  };

  const removeFromWishlistApi = async (wishlistItemId) => {
    try {
      const res = await tryRequest(() =>
        axios.delete(`/wishlist/${wishlistItemId}`, {
          params: { userId: demoUserId },
        }),
      );
      const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
      setWishlist(data);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(data));
      } catch {}
      return data;
    } catch {
      const current = (wishlist || []).filter(
        (it) => (it._id || it.productId || it.id) !== wishlistItemId,
      );
      setWishlist(current);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(current));
      } catch {}
      return current;
    }
  };

  // Cart helpers (basic)
  const fetchCartFromServer = async () => {
    try {
      const res = await tryRequest(() => axios.get(`/cart/${demoUserId}`));
      const serverCart = res.data || { items: [] };
      serverCart.items = Array.isArray(serverCart.items)
        ? serverCart.items
        : [];
      setCart(serverCart);
      try {
        localStorage.setItem("cartItems", JSON.stringify(serverCart));
      } catch {}
      return serverCart;
    } catch {
      try {
        const local = JSON.parse(localStorage.getItem("cartItems") || "null");
        if (local && Array.isArray(local.items)) {
          setCart(local);
          return local;
        }
      } catch {}
      const empty = { items: [] };
      setCart(empty);
      return empty;
    }
  };

  const addToCartApi = async (
    productId,
    change = 1,
    productSnapshot = null,
  ) => {
    try {
      const body = {
        productId,
        change,
        name: productSnapshot?.name,
        price: productSnapshot?.amount ?? productSnapshot?.price,
        image: productSnapshot?.images?.[0] ?? productSnapshot?.image,
      };
      const res = await tryRequest(() =>
        axios.post(`/cart/${demoUserId}`, body),
      );
      const updated = res.data || { items: [] };
      updated.items = Array.isArray(updated.items) ? updated.items : [];
      setCart(updated);
      try {
        localStorage.setItem("cartItems", JSON.stringify(updated));
      } catch {}
      return updated;
    } catch {
      // optimistic local update
      const current = {
        items: Array.isArray(cart.items) ? [...cart.items] : [],
      };
      const idx = current.items.findIndex((it) => it.productId === productId);
      if (idx === -1 && change > 0) {
        current.items.push({
          productId,
          qty: Math.max(1, change),
          name: productSnapshot?.name || "Product",
          price: productSnapshot?.amount ?? productSnapshot?.price ?? 0,
          image: productSnapshot?.images?.[0],
        });
      } else if (idx !== -1) {
        current.items[idx].qty = Math.max(
          0,
          (current.items[idx].qty || 0) + change,
        );
        if (current.items[idx].qty === 0) current.items.splice(idx, 1);
      }
      setCart(current);
      try {
        localStorage.setItem("cartItems", JSON.stringify(current));
      } catch {}
      return current;
    }
  };

  const removeFromCartApi = async (productId) => {
    try {
      const res = await tryRequest(() =>
        axios.delete(`/cart/${demoUserId}/${productId}`),
      );
      const updated = res.data || { items: [] };
      updated.items = Array.isArray(updated.items) ? updated.items : [];
      setCart(updated);
      try {
        localStorage.setItem("cartItems", JSON.stringify(updated));
      } catch {}
      return updated;
    } catch {
      const current = {
        items: Array.isArray(cart.items)
          ? cart.items.filter((it) => it.productId !== productId)
          : [],
      };
      setCart(current);
      try {
        localStorage.setItem("cartItems", JSON.stringify(current));
      } catch {}
      return current;
    }
  };

  // Orders: attempt server only if API configured; otherwise load local stored orders
  const fetchOrders = async () => {
    try {
      const res = await tryRequest(() => axios.get(`/orders/${demoUserId}`));
      const data = Array.isArray(res.data) ? res.data : res.data?.items || [];
      setOrders(data);
      try {
        localStorage.setItem("orders", JSON.stringify(data));
      } catch {}
      return data;
    } catch {
      try {
        const local = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(Array.isArray(local) ? local : []);
        return Array.isArray(local) ? local : [];
      } catch {
        setOrders([]);
        return [];
      }
    }
  };

  useEffect(() => {
    // load cached state first
    try {
      const p = JSON.parse(localStorage.getItem("products") || "[]");
      if (Array.isArray(p) && p.length) setProducts(p);
    } catch {}

    try {
      const w = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      if (Array.isArray(w)) setWishlist(w);
    } catch {}

    try {
      const c = JSON.parse(localStorage.getItem("cartItems") || "null");
      if (c && Array.isArray(c.items)) setCart(c);
    } catch {}

    try {
      const o = JSON.parse(localStorage.getItem("orders") || "[]");
      if (Array.isArray(o)) setOrders(o);
    } catch {}

    // network sync only when API explicitly set
    if (API) {
      fetchProducts();
      fetchCartFromServer();
      fetchWishlistFromServer();
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        buyers,
        cart,
        wishlist,
        orders,
        addToCartApi,
        removeFromCartApi,
        fetchCartFromServer,
        fetchWishlistFromServer,
        addToWishlistApi,
        removeFromWishlistApi,
        fetchProducts,
        fetchOrders,
        API,
        API_ORIGIN,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
