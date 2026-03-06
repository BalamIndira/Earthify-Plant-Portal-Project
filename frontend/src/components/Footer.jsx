import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 py-6 mt-10 shadow-inner">
      <div className="container mx-auto px-4">
        {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-4">
          <a
            href="/seller"
            className="hover:text-white hover:underline transition duration-300"
          >
            Seller
          </a>
          <a
            href="/buyer"
            className="hover:text-white hover:underline transition duration-300"
          >
            Buyer
          </a>
          <a
            href="/admin"
            className="hover:text-white hover:underline transition duration-300"
          >
            Admin
          </a>
          <a
            href="/delivery"
            className="hover:text-white hover:underline transition duration-300"
          >
            Delivery
          </a>
        </div> */}

        
        {/* <div className="border-t border-gray-600 my-4"></div> */}

      
        <p className="text-center text-sm sm:text-base text-gray-400">
          © {new Date().getFullYear()} <span className="text-green-300 font-semibold">Earthify Plant Portal</span>.  
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
