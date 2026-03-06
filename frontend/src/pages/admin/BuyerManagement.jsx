import React, { useEffect, useState } from "react";

export default function BuyerManagement() {
  const [approvedProductsByCategory, setApprovedProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fallbackImage = "/fallback.png"; // fallback image in public folder

  // ✅ Load approved + seller-sent products grouped by category
  useEffect(() => {
    const approved = JSON.parse(localStorage.getItem("approvedProductsByCategory")) || {};
    const sellerProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Merge seller products into category grouping
    const mergedData = { ...approved };
    sellerProducts.forEach((p) => {
      const category = p.category || "Uncategorized";
      if (!mergedData[category]) mergedData[category] = [];
      if (!mergedData[category].some((item) => (item._id || item.id) === (p._id || p.id))) {
        mergedData[category].push(p);
      }
    });

    setApprovedProductsByCategory(mergedData);
    setCategories(["All", ...Object.keys(mergedData)]);
  }, []);

  // ✅ Remove product (affects BuyerManagement & Buyer)
  const handleRemove = (id) => {
    if (!window.confirm("🗑️ Are you sure you want to remove this product?")) return;

    const updatedData = { ...approvedProductsByCategory };
    for (const category in updatedData) {
      updatedData[category] = updatedData[category].filter((p) => (p.id || p._id) !== id);
      if (updatedData[category].length === 0) delete updatedData[category];
    }

    // Update localStorage
    localStorage.setItem("approvedProductsByCategory", JSON.stringify(updatedData));

    // Update main products
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.filter((p) => (p.id || p._id) !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setApprovedProductsByCategory(updatedData);
    alert("✅ Product removed successfully!");
  };

  // ✅ Filter products by selected category
  const filteredProducts =
    selectedCategory === "" || selectedCategory === "All"
      ? Object.values(approvedProductsByCategory).flat()
      : approvedProductsByCategory[selectedCategory] || [];

  // ✅ Function copied from SellerManagementPage to handle images consistently
  const renderProductImage = (img) => {
    if (!img || img.length === 0) {
      return (
        <img
          src={fallbackImage}
          alt="Product"
          className="h-40 w-full object-cover rounded-lg"
        />
      );
    }

    const imgSrc =
      img[0] instanceof Blob
        ? URL.createObjectURL(img[0])
        : typeof img[0] === "string"
        ? img[0].startsWith("http")
          ? img[0]
          : img[0].startsWith("data:image")
          ? img[0]
          : `/${img[0]}`
        : fallbackImage;

    return (
      <img
        src={imgSrc}
        alt="Product"
        className="h-40 w-full object-cover rounded-lg"
        onError={(e) => (e.target.src = fallbackImage)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🛍️ Buyer Management
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-6 flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-white text-green-700 border border-green-400 hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Display */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No approved or seller products available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              {/* ✅ Display product image same as SellerManagement */}
              {renderProductImage(product.images || [product.image])}

              <div className="p-4">
                <h2 className="text-lg font-bold text-green-700">{product.name}</h2>
                <p className="text-gray-600 capitalize">{product.category}</p>
                <p className="text-green-800 font-semibold mt-2">
                  ₹{product.price || product.amount}
                </p>
                <button
                  onClick={() => handleRemove(product._id || product.id)}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
