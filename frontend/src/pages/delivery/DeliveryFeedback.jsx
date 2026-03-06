import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeliveryFeedback() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const deliveryId = "delivery-1";
  const adminId = "admin-1";

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages`,
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Fetch messages error:", err));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter feedback text.");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/messages`,
        {
          senderId: deliveryId,
          receiverId: adminId,
          text,
          type: "delivery",
          status: "pending",
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
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12">
      <div className="w-full max-w-2xl">
        {/* Compact gradient card (reduced size compared to full-page gradient) */}
        <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 rounded-2xl shadow-lg p-6 sm:p-8 border border-amber-300">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-800 mb-4">
            🚚 Delivery Feedback Portal
          </h2>

          {/* Form */}
          <form onSubmit={sendMessage} className="flex flex-col gap-3 mb-4">
            <textarea
              placeholder="🚛 Share your delivery experience..."
              className="border border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-lg p-3 text-gray-800 resize-none min-h-[100px] bg-white"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-3 items-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:scale-[1.02] transition-transform"
              >
                🚀 Send Feedback
              </button>
              <span className="text-sm text-gray-700">
                Messages: {messages.length}
              </span>
            </div>
          </form>

          {/* Recent messages (compact) */}
          <div className="max-h-48 overflow-auto bg-white/80 rounded p-3 border border-amber-200">
            {messages.length === 0 ? (
              <p className="text-sm text-gray-600">No feedback yet.</p>
            ) : (
              messages.map((m, i) => (
                <div key={m._id || i} className="mb-2 last:mb-0">
                  <p className="text-sm font-semibold text-amber-800">
                    {m.senderId}
                  </p>
                  <p className="text-sm text-gray-700">{m.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
