import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
// removed useCart import to use ProductContext reliably
import { ProductContext } from "../../context/ProductContext";

export default function Cart() {
  const navigate = useNavigate();

  // prefer ProductContext which provides cart and API helpers
  const {
    cart: ctxCart,
    fetchCartFromServer,
    addToCartApi,
    removeFromCartApi,
  } = useContext(ProductContext) || {};

  const [items, setItems] = useState([]);

  // Normalize different cart shapes to items array
  const normalize = (c) => {
    if (!c) {
      try {
        const stored = JSON.parse(localStorage.getItem("cartItems") || "null");
        if (!stored) return [];
        if (Array.isArray(stored)) return stored;
        if (Array.isArray(stored.items)) return stored.items;
        if (Array.isArray(stored.cartItems)) return stored.cartItems;
        return [];
      } catch {
        return [];
      }
    }
    if (Array.isArray(c)) return c;
    if (Array.isArray(c.items)) return c.items;
    if (Array.isArray(c.cartItems)) return c.cartItems;
    return [];
  };

  // keep items in sync with context cart and localStorage
  useEffect(() => {
    setItems(normalize(ctxCart));
  }, [ctxCart]);

  // refresh from server on mount
  useEffect(() => {
    if (typeof fetchCartFromServer === "function") {
      fetchCartFromServer().catch(() => {});
    } else {
      // try to load from localStorage if no server function
      setItems(normalize(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getId = (it) =>
    it.productId || it._id || it.id || String(it.name || Math.random());

  const onRemove = async (productId) => {
    // try context API first
    if (typeof removeFromCartApi === "function") {
      await removeFromCartApi(productId);
      // rely on context update to refresh items
      return;
    }
    // local fallback
    setItems((prev) => {
      const next = prev.filter((it) => getId(it) !== productId);
      try {
        localStorage.setItem("cartItems", JSON.stringify({ items: next }));
      } catch {}
      return next;
    });
  };

  const onChangeQty = async (productId, change) => {
    if (change === 0) return;
    // try using addToCartApi for both increment and decrement (it supports change)
    if (typeof addToCartApi === "function") {
      // find snapshot to send helpful metadata (optional)
      const snapshot = items.find((it) => getId(it) === productId) || null;
      await addToCartApi(productId, change, snapshot);
      return;
    }

    // fallback local update
    setItems((prev) =>
      prev
        .map((it) =>
          getId(it) === productId
            ? { ...it, qty: Math.max(0, (it.qty || 1) + change) }
            : it
        )
        .filter((it) => (it.qty || 0) > 0)
    );
  };

  // Buy Now: navigate to Billing with single-item order state
  const handleBuyNow = (it) => {
    const pid = it.productId || it._id || it.id;
    const product = {
      _id: pid,
      name:
        it.name ||
        it.title ||
        (it.product && (it.product.name || it.product.title)) ||
        "Product",
      price: Number(
        it.price ?? it.amount ?? it.product?.price ?? it.product?.amount ?? 0
      ),
      image:
        it.image ||
        it.imageUrl ||
        it.product?.image ||
        (it.product?.images && it.product.images[0]) ||
        "",
    };

    navigate("/billing", {
      state: {
        order: [{ productId: pid, qty: 1 }],
        customer: {
          name: "Demo User",
          address: "Demo Address",
          phone: "0000000000",
        },
        product,
      },
    });
  };

  // render empty cart UI
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <Navbar />
        <div className="pt-28 text-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <p>No items in cart.</p>
          <button
            onClick={() => navigate("/buyer")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Back to Buyer
          </button>
        </div>
      </div>
    );
  }

  const total = items.reduce(
    (acc, it) => acc + Number(it.price ?? it.amount ?? 0) * Number(it.qty ?? 1),
    0
  );

  return (
    <div className="min-h-screen p-4">
      <Navbar />
      <div className="pt-28 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>

        {items.map((it) => {
          const id = getId(it);
          const image =
            it.image ||
            it.imageUrl ||
            (it.images && it.images[0]) ||
            "/images/placeholder.png";
          const name =
            it.name ||
            it.title ||
            (it.product && (it.product.name || it.product.title)) ||
            "Unnamed product";
          const price = Number(
            it.price ??
              it.amount ??
              it.product?.price ??
              it.product?.amount ??
              0
          );
          const qty = Number(it.qty ?? 1);

          return (
            <div
              key={id}
              className="flex justify-between bg-white p-4 shadow rounded mb-4 items-center"
            >
              <div className="flex space-x-4 items-center">
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p>Price: ₹{price.toLocaleString()}</p>
                  <p>Subtotal: ₹{(price * qty).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="px-3 bg-gray-300 rounded"
                  disabled={qty <= 1}
                  onClick={() => onChangeQty(id, -1)}
                >
                  -
                </button>
                <span className="px-3">{qty}</span>
                <button
                  className="px-3 bg-gray-300 rounded"
                  onClick={() => onChangeQty(id, 1)}
                >
                  +
                </button>
                <button
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => onRemove(id)}
                >
                  Remove
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded"
                  onClick={() => handleBuyNow(it)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-bold">
            Total: ₹{total.toLocaleString()}
          </h3>
          <button
            onClick={() => navigate("/billing", { state: { items } })}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
