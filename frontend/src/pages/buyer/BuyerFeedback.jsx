import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BuyerFeedback() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Hardcoded for testing
  const buyerId = "buyer-1";
  const adminId = "admin-1";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Fetch messages error:", err));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter feedback text.");

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        senderId: buyerId,
        receiverId: adminId,
        text,
        type: "buyer", // ✅ must include this
        status: "pending",
      });
      setMessages([res.data, ...messages]);
      setText("");
    } catch (err) {
      console.error("Send message error:", err);
      alert("Failed to send feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-sky-50 flex justify-center items-start p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-cyan-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-cyan-800 mb-6">
          💬 Buyer Feedback Portal
        </h2>

        {/* Form */}
        <form onSubmit={sendMessage} className="flex flex-col gap-3 mb-6">
          <textarea
            placeholder="🛒 Share your shopping experience..."
            className="border border-cyan-300 focus:ring-2 focus:ring-cyan-400 rounded-lg p-3 text-gray-800 resize-none min-h-[100px] bg-cyan-50/40"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:scale-[1.02] transition-transform"
          >
            🚀 Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
