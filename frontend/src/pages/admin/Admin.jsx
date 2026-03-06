import React, { useState } from "react";
import Navbar from "../../components/Navbar";

import AdminDashboard from "./AdminDashboard";
import ProductReviews from "./ProductReviews";
import ProductList from "./ProductList";
import Feedbacks from "./Feedbacks";
import History from "./History";
import BuyerManagement from "./BuyerManagement";
import SellerManagement from "./SellerManagement";
import Footer from "../../components/Footer";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "reviews":
        return <ProductReviews />;
      case "list":
        return <ProductList />;
      case "feedbacks":
        return <Feedbacks />;
      case "history":
        return <History />;
      case "buyers":
        return <BuyerManagement />;
      case "sellers":
        return <SellerManagement />;
      default:
        return <p>Select a section from the menu</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b">
      {/* 🌿 Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* 🌿 Main Content Area (between Navbar & Footer) */}
      <div className="flex flex-1 pt-[50px] pb-[50px] relative overflow-hidden">
        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-md shadow-md m-4 w-fit z-50 fixed top-[80px] left-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>📋</span> Menu
        </button>

        {/* 🌱 Sidebar */}
        <aside
          className={`fixed top-[69px] bottom-[73px] left-0 w-64 bg-gradient-to-b from-green-100 via-emerald-50 to-lime-100 border-r border-green-200 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-40 ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold text-green-800 mb-5 text-center">
              🌍 Earthify Admin
            </h2>
            <ul className="space-y-2">
              {[
                { id: "dashboard", label: "🏠 Dashboard" },
                { id: "reviews", label: "📝 Product Reviews" },
                { id: "list", label: "📦 Product List" },
                { id: "feedbacks", label: "💬 Feedbacks" },
                { id: "history", label: "📜 History" },
                { id: "buyers", label: "👤 Buyers" },
                { id: "sellers", label: "🏪 Sellers" },
              ].map((tab) => (
                <li key={tab.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-green-200 text-green-900 shadow-inner"
                        : "hover:bg-green-100 text-gray-700"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMenuOpen(false);
                    }}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 🌼 Main Content Scrollable Section */}
        <main className="flex-1 md:ml-64 overflow-y-auto p-4 md:p-8 bg-transparent">
          <div className="w-full max-w-5xl mx-auto min-h-[70vh] rounded-xl bg-white/70 backdrop-blur-md shadow-lg p-4 md:p-6 border border-green-100">
            {renderContent()}
          </div>
        </main>
      </div>

   
      {/* <footer className="fixed bottom-0 left-0 right-0 bg-green-800 text-white text-center py-3 text-sm font-medium shadow-inner z-50">
        © 2025 Earthify Admin Panel. All Rights Reserved 🌱
      </footer> */}
      <Footer/>
    </div>
  );
}
