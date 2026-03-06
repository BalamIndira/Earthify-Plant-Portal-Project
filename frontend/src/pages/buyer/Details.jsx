// src/pages/Buyer/Details.jsx
import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Details({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="w-full bg-green-700 bg-opacity-30 backdrop-blur-md shadow-green-300 shadow-md py-2 px-23 flex items-center justify-between sticky top-[4rem] z-40 rounded-b-2xl">
      <div className="flex items-center bg-gray-300 bg-opacity-80 rounded-full px-4 py-2 shadow-inner w-full max-w-md">
        <FaSearch className="text-green-700 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-transparent outline-none flex-grow text-black-800 placeholder-black-500 font-medium"
        />
      </div>

      {/* Right Side: Quick Links */}
      <div className="flex items-center gap-5 px-0">
        <button
          onClick={() => navigate("/cart")}
          className="text-white hover:text-amber-100 font-semibold transition"
        >
          Cart
        </button>
        <button
          onClick={() => navigate("/wishlist")}
          className="text-white hover:text-amber-100 font-semibold transition"
        >
          Wishlist
        </button>
        <button
          onClick={() => navigate("/Buyerhistory")}
          className="text-white hover:text-amber-100 font-semibold transition"
        >
          UserDetails
        </button>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
