
import React from "react";
import { Link } from "react-router-dom";


function Buyernavbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"> Earthify</h1>
     
      <div className="flex gap-6">
        <Link to="/buyer" className="hover:text-gray-200">Plants</Link>
        <Link to="/cart" className="hover:text-gray-200">Cart</Link>
        <Link to="/wishlist" className="hover:text-gray-200">Wishlist</Link>
      </div>
    </nav>
  );
}

export default Buyernavbar;
