import React, { useState, useContext, useMemo } from "react";
import { ProductContext } from "../../context/ProductContext";

// Import sub-sections
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import Messages from "./Message";

export default function Dashboard() {
  const { products = [] } = useContext(ProductContext); // ✅ Safe default

  const [activeSection, setActiveSection] = useState("overview");

  // --- Stats Cards ---
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      color: "bg-green-50",
      textColor: "text-green-800",
    },
    {
      title: "Pending Approvals",
      value: products.filter((p) => p.status === "pending").length,
      color: "bg-amber-50",
      textColor: "text-amber-800",
    },
    {
      title: "Total Orders",
      value: products.reduce((acc, p) => acc + (p.sold || 0), 0),
      color: "bg-blue-50",
      textColor: "text-blue-800",
    },
    {
      title: "Total Earnings (₹)",
      value: products.reduce(
        (acc, p) => acc + (p.sold || 0) * (p.amount || 0),
        0
      ),
      color: "bg-purple-50",
      textColor: "text-purple-800",
    },
  ];

  // --- Top Selling Products ---
  const topProducts = useMemo(() => {
    return [...products]
      .filter((p) => (p.sold || 0) > 0)
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 5);
  }, [products]);

  const maxSold = topProducts.length > 0 ? topProducts[0].sold || 1 : 1;

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800">
        📊 Seller Dashboard
      </h1>
      {/* --- Section Tabs --- */}
      <div className="flex flex-wrap gap-3 border-b pb-2">
        {[
          { key: "overview", label: "Overview" },
          { key: "add", label: "➕ Add Product" },
          { key: "My Products", label: "📦 My Products" },
          { key: "Message", label: "FeedBack" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-3 py-2 rounded-t-md font-semibold transition text-sm sm:text-base min-w-[90px] text-center
              ${
                activeSection === tab.key
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* --- Render Sections --- */}
      {activeSection === "overview" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} p-5 rounded-lg shadow flex flex-col items-start`}
              >
                <p
                  className={`text-xs sm:text-sm font-medium ${stat.textColor} truncate`}
                >
                  {stat.title}
                </p>
                <p className="mt-2 text-xl sm:text-2xl font-bold truncate">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Top Selling Products */}
          {/* <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-800">
              🏆 Top Selling Products
            </h2>
            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded hover:bg-green-50 transition"
                  >
                    <span className="font-medium text-base sm:text-lg truncate w-full sm:w-auto">
                      {product.name || "Unnamed Product"}
                    </span>
                    <div className="flex items-center gap-2 mt-1 sm:mt-0 w-full sm:w-auto">
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {product.sold || 0} sold
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden sm:max-w-[150px]">
                        <div
                          className="h-2 rounded bg-green-600"
                          style={{
                            width: `${((product.sold || 0) / maxSold) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sales yet</p>
            )}
          </div> */}

          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-800">
              📝 Recent Activity
            </h2>
            {products.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {[...products]
                  .slice(-5)
                  .reverse()
                  .map((product, index) => (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row justify-between p-3 border rounded hover:bg-green-50 transition"
                    >
                      <span className="truncate">
                        {product.name || "Unnamed Product"} added
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap mt-1 sm:mt-0">
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleString()
                          : "Date unavailable"}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent activity</p>
            )}
          </div>
        </>
      )}
      {activeSection === "add" && <AddProduct />}
      {activeSection === "My Products" && <MyProducts />} {/* ✅ Updated */}
      {activeSection === "Message" && <Messages />} {/* ✅ Updated */}
      <style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px);}
    to { opacity: 1; transform: translateY(0);}
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease forwards;
  }
`}</style>
    </div>
  );
}
