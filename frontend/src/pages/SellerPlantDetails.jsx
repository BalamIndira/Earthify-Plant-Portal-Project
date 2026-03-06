import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function SellerPlantDetails() {
  const { products, authUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("approved");

  if (!authUser || authUser.role !== "seller") {
    return <p className="p-6">Login as Seller first.</p>;
  }


  const sellerProducts = products.filter((p) => p.sellerId === authUser.id);
  const approved = sellerProducts.filter((p) => p.status === "approved");
  const pending = sellerProducts.filter((p) => p.status === "pending");
  const deleted = sellerProducts.filter((p) => p.status === "deleted");

  function renderList(list, color) {
    if (list.length === 0) return <p className="text-gray-500">No products here</p>;


    return (
      <ul className="space-y-4">
        {list
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)) // latest first
          .map((p) => (
            <li
              key={p.id}
              className="p-4 border rounded-lg shadow-sm flex items-center justify-between bg-white"
            >
              <div className="flex items-center gap-4">
                {p.images[0] && (
                  <img src={p.images[0]} alt={p.name} className="h-16 w-16 rounded object-cover" />
                )}
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">
                    {p.category} • ₹{p.amount} • Qty: {p.quantity}
                  </div>
                  <div className="text-xs text-gray-500">Uploaded: {p.uploadedAt}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${color}`}>{p.status}</span>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-6">🌱 Your Plant Details</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab("approved")}
            className={`px-4 py-2 rounded ${tab === "approved" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Approved
          </button>
          <button
            onClick={() => setTab("pending")}
            className={`px-4 py-2 rounded ${tab === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setTab("deleted")}
            className={`px-4 py-2 rounded ${tab === "deleted" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          >
            Deleted
          </button>
        </div>

        {/* Tab content */}
        {tab === "approved" && renderList(approved, "bg-green-100 text-green-700")}
        {tab === "pending" && renderList(pending, "bg-yellow-100 text-yellow-700")}
        {tab === "deleted" && renderList(deleted, "bg-red-100 text-red-700")}

        {/* Back button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/seller")}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            ← Back to Seller
          </button>
        </div>
      </div>
    </div>
  );
}


