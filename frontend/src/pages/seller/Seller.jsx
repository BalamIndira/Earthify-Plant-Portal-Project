import React, { useState } from "react";

import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Earnings from "./Earnings";
import History from "./History";
import Analytics from "./Analytics";
import Settings from "./Setting";
import Support from "./Support";
import MyProducts from "./MyProducts";
import Messages from "./Message";
import AddProduct from "./AddProduct";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Seller() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuBtn =
    "w-full text-left px-3 py-2 rounded hover:bg-pink-100 transition-colors duration-300";
  const subMenuBtn =
    "ml-4 w-full text-left px-3 py-1 text-sm rounded hover:bg-pink-50 transition-colors duration-300";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-product":
        return <AddProduct />;
      case "my-products":
        return <MyProducts />;
      case "orders":
        return <Orders />;
      case "history":
        return <History />;
      case "earnings":
        return <Earnings />;
      case "analytics":
        return <Analytics />;
      case "messages":
        return <Messages />;
      case "settings":
        return <Settings />;
      case "support":
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-50">
      <Navbar />

      {/* Mobile Toggle */}
     {/* <div className="md:hidden flex justify-between items-center h-12 px-4 bg-pink-200">
  <h2 className="text-lg font-bold text-purple-700">🌿 Seller Menu</h2>
  <button
    className="text-purple-800 text-2xl font-bold"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    ☰
  </button>
</div> */}


      {/* Sidebar */}
      <aside
        className={`fixed top-22 left-4  h-144 w-64 bg-white shadow-md border-r border-pink-200 p-5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-50`}
      >
        <h2 className="text-lg font-bold text-green-600 mb-6 hidden md:block">
          🌿 Seller Menu
        </h2>
        <ul className="space-y-2">
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("dashboard")}>
              📊 Dashboard
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("add-product")}>
              ➕ Add Product
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("my-products")}>
              🌱 My Products
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("history")}>
            📜 History
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("messages")}>
              💬 FeedBack
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("settings")}>
              ⚙️ Settings
            </button>
          </li>
          <li>
            <button className={menuBtn} onClick={() => setActiveTab("support")}>
              🆘 Support
            </button>
          </li>
        </ul>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex justify-center md:ml-64 p-4 md:p-6">
        <div className="w-full max-w-5xl">{renderContent()}</div>
      </main>
      <Footer/>
    </div>
  );
}
