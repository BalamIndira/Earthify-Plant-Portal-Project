// src/pages/seller/Orders.jsx
import React from "react";

export default function Orders() {
  // Later, fetch real orders from context or backend
  const dummyOrders = [
    { id: 1, product: "Peace Lily", buyer: "John", status: "Delivered" },
    { id: 2, product: "Aloe Vera", buyer: "Sara", status: "Pending" },
  ];

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">📦 Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Buyer</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyOrders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.product}</td>
              <td className="border p-2">{order.buyer}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
