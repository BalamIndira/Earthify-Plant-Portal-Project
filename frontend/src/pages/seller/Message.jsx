import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SellerFeedback() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Hardcoded IDs for now
  const sellerId = "seller-1";
  const adminId = "admin-1";

  // Fetch all feedback messages
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages`,
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Fetch messages error:", err));
  }, []);

  // Send feedback
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter feedback text.");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages`,
        {
          senderId: sellerId,
          receiverId: adminId,
          text,
        },
      );
      setMessages([res.data, ...messages]);
      setText("");
    } catch (err) {
      console.error("Send message error:", err);
      alert("Failed to send feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 flex justify-center items-start p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-emerald-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-emerald-800 mb-6">
          🌿 Earthify Seller Feedback Portal
        </h2>

        {/* Feedback Form */}
        <form onSubmit={sendMessage} className="flex flex-col gap-3 mb-6">
          <textarea
            placeholder="🌱 Describe your issue or feedback..."
            className="border border-emerald-300 focus:ring-2 focus:ring-emerald-400 rounded-lg p-3 text-gray-800 resize-none min-h-[100px] bg-emerald-50/40"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 rounded-lg font-medium hover:scale-[1.02] transition-transform"
          >
            🚀 Send Feedback
          </button>
        </form>

        {/* Feedback List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No feedback sent yet 🌱
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className={`p-4 sm:p-5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg ${
                  m.status === "pending"
                    ? "bg-lime-50 border border-lime-300"
                    : "bg-emerald-50 border border-emerald-300"
                }`}
              >
                <p className="text-gray-800 text-base sm:text-lg font-medium mb-2">
                  {m.text}
                </p>
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700">
                  <span
                    className={`font-semibold ${
                      m.status === "pending"
                        ? "text-yellow-700"
                        : "text-green-800"
                    }`}
                  >
                    Status: {m.status.toUpperCase()}
                  </span>
                  <span className="text-gray-500">
                    {new Date(m.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
