// TicketForm.jsx
import React, { useState } from "react";

export default function TicketForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", formData);
    alert("✅ Ticket Raised! Our team will contact you soon.");
    // Here you can send formData to backend API
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🎫 Raise a Support Ticket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="issue"
            placeholder="Issue Title"
            value={formData.issue}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
