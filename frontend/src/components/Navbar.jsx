// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide cursor-pointer whitespace-nowrap">
          <Link to="/home">Earthify Plant Portal</Link>
        </h1>

        {/* Menu Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-3 md:mt-0 text-sm sm:text-base">
          <Link
            to="/home"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Register
          </Link>
          <Link
            to="/profile"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Profile
          </Link>
        </div>
      </div>

      {/* Optional subtle border for separation */}
      <div className="border-t border-green-600"></div>
    </nav>
  );
}
