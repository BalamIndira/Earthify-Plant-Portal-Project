import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Review() {
  const [products, setProducts] = useState([]);

  // Fetch pending products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/products`,
        ); // All products
        const pendingProducts = res.data.filter((p) => p.status === "pending");
        setProducts(pendingProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Update product status in backend
  const updateStatus = async (productId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/products/${productId}`,
        { status },
      );
      setProducts(
        (prev) => prev.filter((p) => p._id !== productId), // Remove from review list
      );
      alert(`Product ${status} successfully!`);
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Action failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-100 p-6">
      <h1 className="text-center text-3xl font-bold text-emerald-800 mb-8">
        Product Review
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-700">
          No products to review.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform overflow-hidden"
            >
              <img
                src={product.images?.[0] || "/images/placeholder.png"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-emerald-800">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-emerald-700 mb-2">
                  {product.category}
                </p>
                <p className="font-semibold">Price: ₹{product.amount}</p>
                <p className="text-sm text-green-600 mt-1">
                  Quantity: {product.quantity}
                </p>
              </div>
              <div className="flex justify-around p-4">
                <button
                  onClick={() => updateStatus(product._id, "approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(product._id, "pending")}
                  className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500"
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(product._id, "deleted")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
