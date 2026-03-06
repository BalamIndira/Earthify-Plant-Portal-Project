import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function MyProducts() {
  const { products } = useContext(ProductContext);
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    setAdminProducts(products || []);
  }, [products]);

  // Helper to handle File objects and fallback images
  const getImageSrc = (product) => {
    if (product.file instanceof File) {
      return URL.createObjectURL(product.file); // Blob URL for local files
    }
    if (product.image && product.image.trim() !== "") {
      return product.image; // Use existing image URL
    }
    return "/placeholder.png"; // Fallback image
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800 text-center md:text-left">
        🌱 My Products
      </h2>

      {adminProducts.length === 0 ? (
        <p className="text-gray-600 text-center md:text-left">
          No products added yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {adminProducts.map((p, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border border-green-200 p-4 rounded-xl bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-md transition hover:shadow-xl hover:scale-105 duration-300"
            >
              <div className="flex-1 mb-3 md:mb-0">
                <h3 className="font-bold text-green-700 text-lg md:text-xl">
                  {p.name}
                </h3>
                <p className="text-green-600">Category: {p.category}</p>
                <p className="text-green-600">Quantity: {p.quantity}</p>
                <p className="text-green-600 font-semibold">Price: ₹{p.amount}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {p.images && p.images.length > 0
                  ? p.images.map((img, i) => (
                      <img
                        key={i}
                        src={typeof img === "string" ? img : img.url || "/placeholder.png"}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded-lg border-2 border-green-300"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                    ))
                  : (
                      <img
                        src={getImageSrc(p)}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-green-300"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                    )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
