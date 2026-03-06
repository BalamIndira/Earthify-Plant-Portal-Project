import React, { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [activeTab, setActiveTab] = useState("approved");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const placeholderImg = "/images/placeholder.png";

  // ✅ Fetch products history from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/api/products/history");

        if (Array.isArray(res.data)) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setProducts(sorted);
        } else {
          setError("Invalid server response");
        }
      } catch (err) {
        console.error("Error fetching product history:", err);
        setError("Failed to load history. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Delete product (mark deleted + store in history)
  const handleDelete = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/api/products/delete/${productId}`);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, status: "deleted" } : p
        )
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Delete failed. Try again.");
    }
  };

  // ✅ Filter products based on tab
  const filtered = products.filter((p) => p.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-4 sm:p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-900 mb-6">
        Product History
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["approved", "pending", "deleted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              activeTab === tab
                ? tab === "approved"
                  ? "bg-green-500 text-white shadow-lg"
                  : tab === "pending"
                  ? "bg-yellow-400 text-white shadow-lg"
                  : "bg-gray-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "approved"
              ? "✅ Approved"
              : tab === "pending"
              ? "⏳ Pending"
              : "🗑️ Deleted"}
          </button>
        ))}
      </div>

      {/* Loading / Error / Empty States */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse text-lg mt-10">
          ⏳ Loading product history...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg mt-10">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No {activeTab} products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p._id}
              className={`rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col ${
                p.status === "deleted" ? "bg-gray-100" : "bg-white"
              }`}
            >
              {/* Images */}
              {p.images?.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto mb-4">
                  {p.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={p.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border object-cover flex-shrink-0"
                      onError={(e) => (e.target.src = placeholderImg)}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 text-gray-400 flex items-center justify-center mb-4 rounded-lg">
                  No Image
                </div>
              )}

              {/* Info */}
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-1 truncate">
                🌿 {p.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Category: {p.category}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Quantity: {p.quantity}
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                Price: ₹{p.amount}
              </p>

              {/* Care Info */}
              {p.care && (
                <div className="bg-green-100 p-3 rounded-lg mb-3 text-sm">
                  <p>💧 <b>Watering:</b> {p.care.watering || "N/A"}</p>
                  <p>☀️ <b>Sunlight:</b> {p.care.sunlight || "N/A"}</p>
                  <p>🌡️ <b>Temperature:</b> {p.care.temperature || "N/A"}</p>
                  <p>🪴 <b>Tips:</b> {p.care.extraTips || "N/A"}</p>
                </div>
              )}

              {/* Status + Delete */}
              <div className="mt-auto flex justify-between items-center">
                <p className="text-sm">
                  <b>Status:</b> {p.status?.toUpperCase()}
                </p>
                {p.status !== "deleted" && (
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Updated: {new Date(p.updatedAt).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
