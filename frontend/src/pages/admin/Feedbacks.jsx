import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFeedback() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all feedbacks
  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages`,
      );

      if (Array.isArray(res.data)) {
        // Sort newest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMessages(sorted);
      } else {
        setError("Invalid response format from server");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load feedback from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark feedback as solved (only for buyer & delivery)
  const markAsSolved = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages/solve/${id}`,
      );
      fetchMessages();
    } catch (err) {
      console.error("Mark solved error:", err);
      alert("Failed to mark feedback as solved");
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "buyer":
        return "🛍️ Buyer Feedback";
      case "delivery":
        return "🚚 Delivery Feedback";
      case "seller":
        return "🧑‍🌾 Seller Feedback";
      default:
        return "💬 General Feedback";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 flex justify-center items-start p-6">
      <div className="w-full max-w-7xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-green-200">
        <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6">
          🌿 Earthify Admin Feedback Dashboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg font-medium animate-pulse">
            ⏳ Loading feedback...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg font-medium">
            {error}
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-medium">
            No feedback found 🌱
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`p-5 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
                  m.status === "pending"
                    ? "bg-lime-100 border-lime-400"
                    : "bg-emerald-100 border-emerald-400"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">
                    {getTypeIcon(m.type)}
                  </span>
                  <span
                    className={`font-bold ${
                      m.status === "pending"
                        ? "text-yellow-700"
                        : "text-green-800"
                    }`}
                  >
                    {m.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>

                {/* Feedback text */}
                <p className="text-gray-800 text-base md:text-lg font-medium mb-2">
                  {m.text || "No message content"}
                </p>

                {/* Sender / Receiver */}
                <div className="text-sm text-gray-700 mb-2">
                  {m.senderName && (
                    <p>
                      From:{" "}
                      <span className="text-green-800 font-semibold">
                        {m.senderName}
                      </span>
                    </p>
                  )}
                  {m.receiverName && (
                    <p>
                      To:{" "}
                      <span className="text-green-800 font-semibold">
                        {m.receiverName}
                      </span>
                    </p>
                  )}
                </div>

                {/* Extra info for each type */}
                {m.type === "seller" && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      Seller Name: {m.sellerName || "N/A"}
                    </p>
                    <p className="text-green-700">
                      Email: {m.sellerEmail || "N/A"}
                    </p>
                    <p className="text-green-700">
                      Contact: {m.sellerContact || "N/A"}
                    </p>
                  </div>
                )}
                {m.type === "buyer" && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-semibold">
                      Buyer Name: {m.buyerName || "N/A"}
                    </p>
                    <p className="text-blue-700">
                      Email: {m.buyerEmail || "N/A"}
                    </p>
                    <p className="text-blue-700">
                      Contact: {m.buyerContact || "N/A"}
                    </p>
                  </div>
                )}
                {m.type === "delivery" && (
                  <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-800 font-semibold">
                      Delivery Name: {m.deliveryName || "N/A"}
                    </p>
                    <p className="text-orange-700">
                      Contact: {m.deliveryContact || "N/A"}
                    </p>
                  </div>
                )}

                {/* Date */}
                {m.createdAt && (
                  <small className="block text-gray-500 text-xs mt-1">
                    Submitted: {new Date(m.createdAt).toLocaleString("en-IN")}
                  </small>
                )}

                {/* Mark as solved */}
                {m.status === "pending" && (
                  <button
                    onClick={() => markAsSolved(m._id)}
                    className="mt-3 px-4 py-2 bg-green-700 text-white rounded-full text-sm font-medium hover:bg-green-800 transition-all duration-200"
                  >
                    ✅ Mark as Solved
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
