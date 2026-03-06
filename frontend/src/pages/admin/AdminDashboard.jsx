import React from "react";

export default function AdminDashboard() {
  // --- Dashboard Summary Data ---
  const stats = {
    buyers: 320,
    sellers: 58,
    plantsListed: 540,
    completedOrders: 450,
    activeOrders: 32,
    pendingDeliveries: 12,
    directFeedbacks: 120,
  };

  // --- Recent Orders ---
  const recentOrders = [
    { id: "ORD001", buyer: "Anjali", plant: "Rose Plant", status: "Delivered" },
    { id: "ORD002", buyer: "Rahul", plant: "Tulsi Plant", status: "Pending" },
    { id: "ORD003", buyer: "Meena", plant: "Aloe Vera", status: "Shipped" },
    { id: "ORD004", buyer: "Kiran", plant: "Money Plant", status: "Delivered" },
  ];

  // --- Top Sellers ---
  const topSellers = [
    { name: "GreenLeaf Nursery", plants: 120, rating: 4.9 },
    { name: "Urban Gardeners", plants: 95, rating: 4.7 },
    { name: "EcoLife Plants", plants: 80, rating: 4.6 },
  ];

  return (
    <div className="space-y-8 px-2 md:px-8 pt-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700">
          🌱 Plant Marketplace Admin Dashboard
        </h2>
        <p className="text-gray-600 mt-2">
          Admin overview: Manage buyers, sellers, listings, orders, deliveries, and feedback—all from one place.
        </p>
      </header>

      {/* Statistics Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="👤 Buyers" value={stats.buyers} />
        <StatCard label="🏪 Sellers" value={stats.sellers} />
        <StatCard label="🌿 Plants Listed" value={stats.plantsListed} />
        <StatCard label="✅ Orders Completed" value={stats.completedOrders} />
        <StatCard label="🕒 Active Orders" value={stats.activeOrders} />
        <StatCard label="🚚 Pending Deliveries" value={stats.pendingDeliveries} />
        <StatCard label="💬 Direct Feedbacks" value={stats.directFeedbacks} />
      </section>

      {/* Recent Orders Table */}
      <section className="bg-white shadow rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-green-700">
          🪴 Recent Orders
        </h3>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border border-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="border px-2 py-2 text-left">Order ID</th>
                  <th className="border px-2 py-2 text-left">Buyer</th>
                  <th className="border px-2 py-2 text-left">Plant</th>
                  <th className="border px-2 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-green-50 transition text-gray-700"
                  >
                    <td className="border px-2 py-2">{o.id}</td>
                    <td className="border px-2 py-2">{o.buyer}</td>
                    <td className="border px-2 py-2">{o.plant}</td>
                    <td
                      className={`border px-2 py-2 font-medium ${
                        o.status === "Delivered"
                          ? "text-green-600"
                          : o.status === "Pending"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    >
                      {o.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No recent orders.</p>
        )}
      </section>

      {/* Top Sellers Section */}
      <section className="bg-white shadow rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-green-700">
          🏆 Top Sellers
        </h3>
        {topSellers.length > 0 ? (
          <ol className="space-y-3 list-decimal list-inside">
            {topSellers.map((s, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b pb-2 text-gray-700"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-xs md:text-sm text-gray-600">
                  {s.plants} plants • ⭐ {s.rating}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500 text-sm">No sellers data.</p>
        )}
      </section>
    </div>
  );
}

// --- StatCard Component ---
function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-3 text-center hover:shadow-lg transition">
      <h4 className="text-gray-600 text-sm md:text-base font-medium">{label}</h4>
      <p className="text-xl md:text-2xl font-bold text-green-700 mt-2">{value ?? 0}</p>
    </div>
  );
}
