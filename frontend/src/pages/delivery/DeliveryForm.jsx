import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function DeliveryForm() {
  const { orders, setOrders, authUser } = useContext(AppContext);
  const [orderId, setOrderId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAssign = (e) => {
    e.preventDefault();
    if (!orderId || !assignedTo) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === Number(orderId) ? { ...o, assignedTo } : o))
    );
    setOrderId("");
    setAssignedTo("");
    alert("Assigned successfully");
  };

  return (
    <form onSubmit={handleAssign} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Assign Delivery</h2>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border rounded px-2 py-1 w-32"
        />
        <input
          type="text"
          placeholder="Delivery Person ID"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded px-2 py-1 w-40"
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
          Assign
        </button>
      </div>
    </form>
  );
}
