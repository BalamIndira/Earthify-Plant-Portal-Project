// src/pages/seller/Earnings.jsx
import React from "react";

export default function Earnings() {
  // Example dummy data
  const earnings = [
    { month: "January", amount: 5200 },
    { month: "February", amount: 7000 },
    { month: "March", amount: 3000 },
  ];

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">💰 Earnings Overview</h2>
      <ul className="space-y-3">
        {earnings.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between p-3 border rounded hover:bg-green-50 transition"
          >
            <span>{item.month}</span>
            <span className="font-semibold text-green-700">₹{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
