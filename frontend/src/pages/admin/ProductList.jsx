// AdminProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Fallback image
const fallbackImg = "https://via.placeholder.com/150";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/products`,
        );
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProductImage = (img) => {
    if (!img)
      return (
        <img
          src={fallbackImg}
          alt="No Image"
          className="w-full h-48 object-cover rounded-lg"
        />
      );
    try {
      if (img instanceof Blob)
        return (
          <img
            src={URL.createObjectURL(img)}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg"
          />
        );
      return (
        <img
          src={img}
          alt="Product"
          onError={(e) => (e.target.src = fallbackImg)}
          className="w-full h-48 object-cover rounded-lg"
        />
      );
    } catch {
      return (
        <img
          src={fallbackImg}
          alt="No Image"
          className="w-full h-48 object-cover rounded-lg"
        />
      );
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading products...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
        Product List
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Image */}
              <div className="mb-3">
                {renderProductImage(product.images?.[0])}
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-semibold text-green-800 mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                Category: {product.category || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Quantity: {product.quantity || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Price: ₹{product.amount || "0"}
              </p>
              {product.sellerName && (
                <p className="text-sm text-gray-600 mb-1">
                  Seller: {product.sellerName}
                </p>
              )}
              {product.sellerEmail && (
                <p className="text-sm text-gray-600 mb-1">
                  Email: {product.sellerEmail}
                </p>
              )}
              {product.sellerContact && (
                <p className="text-sm text-gray-600 mb-1">
                  Contact: {product.sellerContact}
                </p>
              )}

              {/* <span
                className={`px-2 py-1 rounded-full font-semibold text-white text-sm mb-2 ${
                  product.status === "approved"
                    ? "bg-green-600"
                    : product.status === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {product.status || "pending"}
              </span> */}

              {/* Actions */}
              {/* <div className="flex gap-2 mt-auto flex-wrap">
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
                  ✅ Approve
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">
                  ⚠ Reject
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">
                  ❌ Delete
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
