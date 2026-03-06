import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaLeaf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  qty = 0,
  isWishlisted = false,
  onCartChange,
  onWishlistToggle,
  expanded = false, // receive which card is expanded
  onToggleDetails = () => {}, // callback from parent to toggle
}) {
  const navigate = useNavigate();
  const [localQty, setLocalQty] = useState(qty);

  const handleCartInc = () => {
    if (onCartChange) onCartChange(product, "inc");
    setLocalQty((prev) => prev + 1);
  };

  const handleCartDec = () => {
    if (onCartChange) onCartChange(product, "dec");
    setLocalQty((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const handleWishlistToggle = () => {
    if (onWishlistToggle) onWishlistToggle(product);
  };

  const handleBuyNow = () => {
    if (localQty === 0) {
      setLocalQty(1);
      if (onCartChange) onCartChange(product, "inc");
    }
    navigate("/billing", { state: { product, qty: localQty } });
  };

  const plantDetails = {
    "Maintenance": product.maintenance,
    "Care Tips": product.careTips,
    "Sunlight": product.sunlight || product.care?.sunlight,
    "Watering": product.watering || product.care?.watering,
    "Soil Type": product.soil || product.care?.soil,
    "Extra Notes": product.extraNotes || product.care?.extraTips,
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
      <ImageSlider images={product.images || []} name={product.name} onClick={handleCartInc} />

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-green-700">{product.name}</h3>
          <button
            onClick={() => onToggleDetails(product._id)}
            className="flex items-center gap-1 text-green-700 hover:text-green-900"
            title="View Plant Details"
          >
            <FaLeaf />
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        <p className="text-gray-600 text-xs">Category: {product.category}</p>
        <p className="text-gray-700 font-medium text-sm">Price: ₹{product.amount}</p>
        <p className="text-xs text-gray-500">Stock: {product.quantity}</p>

        <div className="flex items-center space-x-2 mt-2">
          {localQty === 0 ? (
            <button
              onClick={handleCartInc}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add to Cart
            </button>
          ) : (
            <>
              <button
                onClick={handleCartDec}
                disabled={localQty <= 1}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                -
              </button>
              <span className="px-2">{localQty}</span>
              <button
                onClick={handleCartInc}
                disabled={localQty >= product.quantity}
                className="px-2 py-1 bg-green-200 rounded disabled:opacity-50"
              >
                +
              </button>
            </>
          )}

          <button
            onClick={handleWishlistToggle}
            className={`px-3 py-2 rounded ${
              isWishlisted ? "bg-red-500 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>

          <button
            onClick={handleBuyNow}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buy Now
          </button>
        </div>

        {/* Show plant details only if this card is expanded */}
        {expanded && (
          <div className="mt-3 p-3 border rounded bg-gray-50 text-sm text-gray-700 space-y-2">
            <h4 className="font-semibold text-green-700">🌱 Plant Details</h4>
            {Object.entries(plantDetails).map(([key, value]) =>
              value ? <p key={key}><strong>{key}:</strong> {value}</p> : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageSlider({ images, name, onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/200x150"
        alt={name}
        className="w-full h-40 object-cover cursor-pointer"
        onClick={onClick}
      />
    );
  }

  const nextSlide = () => setCurrentIndex((p) => (p + 1) % images.length);
  const prevSlide = () => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  return (
    <div className="relative group">
      <img
        src={images[currentIndex]}
        alt={name}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        onClick={onClick}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
}
