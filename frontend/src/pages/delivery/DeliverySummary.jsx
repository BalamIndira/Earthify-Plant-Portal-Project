import React from "react";

export default function DeliverySummary({ order, updateOrderStatus }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-green-700 mb-2">
        Order ID: {order.id}
      </h2> 

      <p className="text-gray-600 mb-3">
        <strong>Customer:</strong> {order.customerName}
      </p>

      {/* Show all products inside this order */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800 mb-1">Products:</h3>

        {order.items && order.items.length > 0 ? (
          <ul className="list-disc ml-5">
            {order.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.productName} — Qty: {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>

      {/* Delivery Status */}
      <p className="text-gray-700 mb-3">
        <strong>Status:</strong>{" "}
        {order.delivered ? (
          <span className="text-green-600 font-semibold">Delivered ✔</span>
        ) : (
          <span className="text-red-500 font-semibold">Not Delivered ❌</span>
        )}
      </p>

      {/* Button to update delivery status */}
      {!order.delivered ? (
        <button
          onClick={() => updateOrderStatus(order.id, true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Mark as Delivered
        </button>
      ) : (
        <button
          onClick={() => updateOrderStatus(order.id, false)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Mark as Not Delivered
        </button>
      )}
    </div>
  );
}
