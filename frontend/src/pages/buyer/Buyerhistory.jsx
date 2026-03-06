import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const API =
  import.meta.env.VITE_API_URL ||
  `http://localhost:${import.meta.env.VITE_API_PORT || 4000}/api`;
const API_ORIGIN = API.replace(/\/api\/?$/, "");

const PLACEHOLDER = "https://via.placeholder.com/80";

export default function UserHistory() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("demoUserId") || "demo-user-unknown";
  const { products: ctxProducts } = useContext(ProductContext) || {};

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    if (Array.isArray(ctxProducts) && ctxProducts.length > 0) {
      setProductsMap(
        Object.fromEntries(ctxProducts.map((p) => [p._id || p.id, p]))
      );
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem("products") || "[]");
      if (Array.isArray(saved) && saved.length > 0) {
        setProductsMap(
          Object.fromEntries(saved.map((p) => [p._id || p.id, p]))
        );
        return;
      }
    } catch {}
  }, [ctxProducts]);

  const resolveImage = (item, product) => {
    const candidates = [
      item?.image,
      item?.imageUrl,
      product?.image,
      product?.imageUrl,
      product?.images?.[0],
      item?.images?.[0],
      item?.media?.[0],
      item?.photos?.[0],
    ];
    for (let c of candidates) {
      if (!c) continue;
      if (typeof c === "object") c = c.url || c.src || "";
      if (!c) continue;
      if (c.startsWith("http")) return c;
      if (c.startsWith("//")) return window.location.protocol + c;
      if (c.startsWith("/")) return `${API_ORIGIN}${c}`;
      return `${API_ORIGIN}/${c}`.replace(/([^:]\/)\/+/g, "$1");
    }
    return PLACEHOLDER;
  };

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/orders/${userId}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setOrders(data);
    } catch {
      try {
        const res2 = await axios.get(`${API}/orders/${userId}`);
        const data2 = Array.isArray(res2.data) ? res2.data : [];
        setOrders(data2);
      } catch (err2) {
        try {
          const local = JSON.parse(localStorage.getItem("orders") || "[]");
          setOrders(Array.isArray(local) ? local : []);
          setError("Offline — showing local orders.");
        } catch {
          setOrders([]);
          setError("Failed to load history.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <Navbar />
        <div className="pt-28 text-center">
          <h2 className="text-2xl font-bold">Purchase History</h2>
          <p>Loading order history...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <Navbar />
        <div className="pt-28 text-center">
          <h2 className="text-2xl font-bold">Purchase History</h2>
          <p>{error || "You have no past orders."}</p>
          <button
            onClick={() => navigate("/buyer")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Navbar />
      <div className="pt-28 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Your Purchase History 📜
        </h2>

        {orders.map((order) => {
          const items = Array.isArray(order.items) ? order.items : [];
          const orderTotal = items.reduce((acc, item) => {
            const pid = item.productId || item._id || item.id;
            const product = productsMap[pid] || {};
            const price = Number(
              item.price ||
                item.amount ||
                product.price ||
                product.amount ||
                0
            );
            const qty = Number(item.qty || item.quantity || 1);
            return acc + price * qty;
          }, 0);

          const date = new Date(
            order.orderDate || order.createdAt
          ).toLocaleDateString();

          return (
            <div
              key={order._id || order.id}
              className="bg-white p-6 shadow-xl rounded-lg mb-6 border-t-4 border-indigo-500"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <p className="text-lg font-semibold text-gray-700">
                  Order ID: #{order._id || order.id}
                </p>
                <p className="text-md font-medium text-indigo-600">
                  Date: {date}
                </p>
              </div>

              {/* Products */}
              {items.map((item, index) => {
                const pid = item.productId || item._id || item.id;
                const product = productsMap[pid] || {};
                const name =
                  item.name ||
                  item.title ||
                  product.name ||
                  product.title ||
                  "Unnamed Product";
                const amount = Number(
                  item.price ||
                    item.amount ||
                    product.price ||
                    product.amount ||
                    0
                );
                const qty = Number(item.qty || item.quantity || 1);
                const image = resolveImage(item, product);

                return (
                  <div
                    key={index}
                    className="flex space-x-4 mb-3 border-b last:border-b-0 pb-3"
                  >
                    <img
                      src={image}
                      alt={name}
                      onError={(e) => {
                        if (e?.target) e.target.src = PLACEHOLDER;
                      }}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {qty} | Price: ₹{amount} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{amount * qty}</p>
                    </div>
                  </div>
                );
              })}

              {/* 🔥 Delivery Status Section Added */}
              <div className="mt-4 pt-3 border-t border-dashed">
                <p className="text-md font-semibold mb-2">
                  Delivery Status:{" "}
                  {order.delivered ? (
                    <span className="text-green-600 font-bold">
                      Delivered ✔️
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold">
                      Not Delivered ❌
                    </span>
                  )}
                </p>

                <p className="text-xl font-bold text-right">
                  Total Paid: ₹{orderTotal}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
