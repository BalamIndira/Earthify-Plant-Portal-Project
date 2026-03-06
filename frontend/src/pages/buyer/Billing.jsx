import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

// Use same default API as ProductContext (falls back to localhost:4000)
const API =
  import.meta.env.VITE_API_URL ||
  `http://localhost:${import.meta.env.VITE_API_PORT || 4000}/api`;

function Billing() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  if (!product) return <p className="p-4">No product selected for billing.</p>;

  const productImage =
    product.image ||
    (product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/200x150");
  const productCost = Number(
    product.cost ?? product.amount ?? product.price ?? 0
  );

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");

  const handleIncrement = () => {
    if (quantity < (product.quantity || 100)) {
      setQuantity(quantity + 1);
    } else {
      alert("Stock limit reached!");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveOrderLocal = (order) => {
    try {
      const list = JSON.parse(localStorage.getItem("orders") || "[]");
      list.unshift(order);
      localStorage.setItem("orders", JSON.stringify(list));
    } catch (e) {
      console.warn("saveOrderLocal failed", e);
    }
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in all billing details.");
      return;
    }

    setProcessing(true);
    setStatus("Processing payment...");

    const totalAmount = productCost * quantity;
    const userId = localStorage.getItem("demoUserId") || "demo-user";

    // Construct order payload to persist (backend or local)
    const orderPayload = {
      id: "local-" + Date.now(),
      userId,
      items: [
        {
          productId: product._id || product.id,
          name: product.name,
          qty: quantity,
          price: productCost,
          image: productImage,
        },
      ],
      total: totalAmount,
      customer: { ...formData },
      createdAt: new Date().toISOString(),
    };

    try {
      // Try to create payment/order on backend
      const res = await axios.post(`${API}/payment/order`, {
        amount: Math.round(totalAmount * 100),
        metadata: { userId, items: orderPayload.items },
      });

      // If backend returns order data, try to open Razorpay if available.
      const backendOrder = res?.data;
      if (backendOrder && window.Razorpay) {
        setStatus("Opening payment widget...");
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: backendOrder.amount || Math.round(totalAmount * 100),
          currency: backendOrder.currency || "INR",
          order_id:
            backendOrder.id || backendOrder.order_id || backendOrder._id,
          name: "AgriShop",
          description: "Product Purchase",
          handler: async function (resp) {
            // try verifying with backend
            try {
              await axios.post(`${API}/payment/verify`, {
                ...resp,
                userId,
                orderId:
                  backendOrder.id || backendOrder.order_id || backendOrder._id,
              });
              // persist order locally as well so Buyerhistory shows it immediately
              saveOrderLocal({
                ...orderPayload,
                id: backendOrder.id || orderPayload.id,
                total: totalAmount,
              });
              setStatus("Payment successful. Redirecting...");
              setTimeout(() => navigate("/buyerhistory"), 1200);
            } catch (verErr) {
              console.error("verification failed", verErr);
              alert(
                "Payment succeeded but verification failed. Contact support."
              );
            }
          },
          prefill: { name: formData.name, contact: formData.phone },
          theme: { color: "#00a76f" },
        };
        const rzp = new window.Razorpay(options);
        rzp.on &&
          rzp.on("payment.failed", (err) => {
            console.error("Razorpay failure", err);
            alert("Payment failed. Try again.");
          });
        rzp.open();
      } else {
        // Backend did not return order data; fallback to local success
        saveOrderLocal(orderPayload);
        setStatus("Order placed (backend returned no order). Redirecting...");
        setTimeout(() => navigate("/buyerhistory"), 1200);
      }
    } catch (err) {
      // Network/backend error -> fallback: save order locally and treat as purchased
      console.warn(
        "Payment endpoint unreachable, using offline fallback:",
        err?.message || err
      );
      saveOrderLocal(orderPayload);
      setStatus("Backend unreachable — order saved locally. Redirecting...");
      setTimeout(() => navigate("/buyerhistory"), 1000);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>

        <div className="border p-4 rounded shadow">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-2"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/200x150")
            }
          />
          <p>
            <b>Product:</b> {product.name}
          </p>
          <p>
            <b>Price per unit:</b> ₹{productCost}
          </p>

          <div className="flex items-center space-x-2 my-2">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              disabled={processing}
            >
              -
            </button>
            <span className="text-gray-700 font-semibold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              disabled={processing}
            >
              +
            </button>
          </div>

          <p className="text-lg font-semibold">
            Total: ₹{productCost * quantity}
          </p>
        </div>

        <form
          className="mt-4 flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded"
            required
            value={formData.name}
            onChange={handleInputChange}
            disabled={processing}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-2 rounded"
            required
            value={formData.address}
            onChange={handleInputChange}
            disabled={processing}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border p-2 rounded"
            required
            value={formData.phone}
            onChange={handleInputChange}
            disabled={processing}
          />
          <button
            type="button"
            onClick={handlePayment}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
            disabled={processing}
          >
            {processing
              ? "Processing..."
              : `Confirm & Pay ₹${productCost * quantity}`}
          </button>
        </form>

        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}

        <button
          onClick={() => navigate("/buyer")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={processing}
        >
          ⬅ Back to Buyer
        </button>
      </div>
    </div>
  );
}

export default Billing;
