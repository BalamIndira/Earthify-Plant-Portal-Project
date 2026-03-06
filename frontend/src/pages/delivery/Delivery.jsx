import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar";
import DeliveryFeedbackToggle from "./DeliveryFeedback";
import Footer from "../../components/Footer";
import DeliverySummary from "./DeliverySummary";

const PLACEHOLDER = "https://via.placeholder.com/80";

// Helper to resolve image URLs from various shapes
const resolveImage = (item, apiOrigin = window.location.origin) => {
  const candidates = [
    item?.image,
    item?.imageUrl,
    item?.product?.image,
    item?.product?.imageUrl,
    item?.product?.images?.[0],
    item?.images?.[0],
    item?.media?.[0],
    item?.photos?.[0],
  ];
  for (let c of candidates) {
    if (!c) continue;
    if (typeof c === "object") c = c.url || c.src || "";
    if (!c) continue;
    if (c.startsWith("http://") || c.startsWith("https://")) return c;
    if (c.startsWith("//")) return window.location.protocol + c;
    if (c.startsWith("/")) return `${apiOrigin}${c}`;
    return `${apiOrigin}/${c}`.replace(/([^:]\/)\/+/g, "$1");
  }
  return PLACEHOLDER;
};

export default function Delivery() {
  const { orders = [], updateOrderStatus, authUser } = useContext(AppContext);

  // Local fallback: load orders saved by Billing (localStorage "orders")
  const [localOrders, setLocalOrders] = useState([]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("orders") || "[]");
      if (Array.isArray(saved)) setLocalOrders(saved);
    } catch (e) {
      setLocalOrders([]);
    }
  }, []);

  // Use AppContext orders when available, otherwise use localOrders
  const allOrders =
    Array.isArray(orders) && orders.length > 0 ? orders : localOrders;

  // Keep a local displayedOrders state so UI updates immediately when marking delivered
  const [displayedOrders, setDisplayedOrders] = useState([]);
  useEffect(() => {
    // show only pending orders by default (user asked to remove after delivered)
    const pending = (allOrders || []).filter((o) => !o.delivered);
    setDisplayedOrders(pending);
  }, [allOrders]);

  // Show all orders assigned to delivery person (delivered + not delivered) -> but UI shows pending only
  const myOrders = displayedOrders.filter((o) =>
    authUser?.role === "delivery" ? o.assignedTo === authUser.id : true
  );

  // Sort: Not delivered first, delivered last (here all are pending); keeping for stability
  const sortedOrders = [...myOrders].sort(
    (a, b) => Number(a.delivered) - Number(b.delivered)
  );

  const updateWrapper = (orderId, delivered) => {
    // support both updateOrderStatus(id, { delivered: true }) and (id, true)
    if (!orderId || typeof updateOrderStatus !== "function") return;
    try {
      updateOrderStatus(orderId, { delivered });
    } catch {
      try {
        updateOrderStatus(orderId, delivered);
      } catch (e) {
        console.warn("updateOrderStatus failed", e);
      }
    }
  };

  // Mark order delivered: update AppContext (if available), update localStorage and remove from displayedOrders
  const handleMarkDelivered = (order) => {
    if (!order) return;
    const id = order._id || order.id || order.orderId || order.localId;
    // 1) call context updater if exists
    try {
      if (typeof updateOrderStatus === "function") updateWrapper(id, true);
    } catch (e) {
      console.warn("updateOrderStatus call failed:", e);
    }

    // 2) update localStorage orders so buyerhistory will reflect delivered status
    try {
      const raw = JSON.parse(localStorage.getItem("orders") || "[]");
      const updated = Array.isArray(raw)
        ? raw.map((o) => {
            const oid = o._id || o.id || o.orderId || o.localId;
            if (!oid) return o;
            if (oid === id) return { ...o, delivered: true };
            return o;
          })
        : raw;
      localStorage.setItem("orders", JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to update localStorage orders:", e);
    }

    // 3) remove the order from displayedOrders (so it disappears from delivery page)
    setDisplayedOrders((prev) =>
      prev.filter((o) => {
        const oid = o._id || o.id || o.orderId || o.localId;
        return oid !== id;
      })
    );
  };

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: "#eaf9ef" }}>
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-green-700">
            🚚 Delivery Dashboard
          </h1>

          {/* Orders List */}
          {sortedOrders.length === 0 ? (
            <div className="text-gray-600 text-center mt-6">
              No pending orders available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 mt-6">
              {sortedOrders.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                const orderId = order.id || order._id || order.orderId || "—";
                const customer =
                  order.customer?.name ||
                  order.userName ||
                  order.userId ||
                  "Customer";
                const apiOrigin =
                  (order.apiOrigin &&
                    order.apiOrigin.replace(/\/api\/?$/, "")) ||
                  window.location.origin;

                const orderTotal = items.reduce((acc, it) => {
                  const price = Number(
                    it.price ?? it.amount ?? it.product?.price ?? 0
                  );
                  const qty = Number(it.qty ?? it.quantity ?? 1);
                  return acc + price * qty;
                }, 0);

                // Build normalized order for DeliverySummary (it expects id, customerName, items[])
                const normalized = {
                  id: orderId,
                  customerName: customer,
                  delivered: Boolean(order.delivered),
                  items: items.map((it) => ({
                    productName:
                      it.name ||
                      it.title ||
                      it.product?.name ||
                      it.productName ||
                      "Product",
                    quantity: it.qty ?? it.quantity ?? 1,
                    price: it.price ?? it.amount ?? it.product?.price ?? 0,
                    image: resolveImage(it, apiOrigin),
                  })),
                };

                return (
                  <div
                    key={orderId}
                    className="bg-white p-4 rounded shadow-sm border"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">Order: #{orderId}</p>
                        <p className="text-sm text-gray-600">
                          Customer: {customer}
                        </p>
                        <p className="text-sm text-gray-600">
                          Placed:{" "}
                          {new Date(
                            order.createdAt || order.orderDate || Date.now()
                          ).toLocaleString()}
                        </p>
                      </div>

                      {/* <div className="w-full md:w-80">
                        
                        <DeliverySummary
                          order={normalized}
                          updateOrderStatus={(id, flag) =>
                            updateWrapper(id, flag)
                          }
                        />
                      </div> */}
                    </div>

                    {/* Detailed items with images */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {normalized.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-3 p-2 border rounded"
                        >
                          <img
                            src={it.image || PLACEHOLDER}
                            alt={it.productName}
                            onError={(e) => (e.target.src = PLACEHOLDER)}
                            className="w-16 h-16 rounded object-cover border"
                          />
                          <div className="flex-grow">
                            <p className="font-medium">{it.productName}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {it.quantity} • ₹{it.price} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{Number(it.price) * Number(it.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <p className="font-bold">Total: ₹{orderTotal}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">
                          {order.notes || ""}
                        </p>
                        <button
                          onClick={() => handleMarkDelivered(order)}
                          className="ml-3 px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DeliveryFeedbackToggle />
      </div>

      <Footer />
    </>
  );
}
