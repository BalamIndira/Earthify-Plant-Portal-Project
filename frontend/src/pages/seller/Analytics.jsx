// src/pages/seller/Analytics.jsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend,
} from "recharts";

/**
 * Analytics component
 * Props:
 *  - products: [{ id, name, category }]
 *  - orders: [{ id, items:[{ productId, name, qty, cost }], total, createdAt }]
 */
export default function Analytics({ products = [], orders = [] }) {
  // fallback sample if none provided (still works even if you pass real data later)
  const sampleOrders = [
    { id: 1, items: [{ productId: "p1", name: "Peace Lily", qty: 2, cost: 250 }], total: 500, createdAt: new Date().toISOString(), status: "Paid" },
    { id: 2, items: [{ productId: "p2", name: "Aloe Vera", qty: 1, cost: 300 }], total: 300, createdAt: new Date(Date.now() - 24*3600*1000).toISOString(), status: "Paid" }
  ];

  const dataOrders = (orders && orders.length) ? orders : sampleOrders;
  const productIndex = useMemo(() => {
    const idx = new Map();
    for (const p of products) {
      if (p?.id) idx.set(p.id, p);
      if (p?.name) idx.set(p.name.toLowerCase(), p);
    }
    return idx;
  }, [products]);

  // Flatten items from orders (attach order date)
  const flattenedItems = useMemo(() => {
    const arr = [];
    for (const o of dataOrders) {
      const created = o?.createdAt ? new Date(o.createdAt) : new Date();
      const items = Array.isArray(o.items) ? o.items : [];
      for (const it of items) {
        const qty = Number(it.qty ?? it.quantity ?? 0);
        const cost = Number(it.cost ?? it.amount ?? 0);
        arr.push({
          orderId: o.id,
          productId: it.productId ?? null,
          name: it.name ?? (it.productId ? (productIndex.get(it.productId)?.name) : "Unknown"),
          qty: qty || 0,
          amount: cost || 0,
          date: created,
        });
      }
    }
    return arr;
  }, [dataOrders, productIndex]);

  // Product sales: total qty sold per product name
  const productSales = useMemo(() => {
    const map = new Map();
    for (const it of flattenedItems) {
      const key = (it.name ?? "Unknown");
      map.set(key, (map.get(key) || 0) + (it.qty || 0));
    }
    const arr = Array.from(map.entries()).map(([name, sold]) => ({ name, sold }));
    arr.sort((a, b) => b.sold - a.sold);
    return arr;
  }, [flattenedItems]);

  // Sales over time (monthly revenue) - keyed by month start timestamp
  const salesOverTime = useMemo(() => {
    const map = new Map(); // key: ms timestamp (first day of month), value: revenue
    for (const o of dataOrders) {
      const date = o?.createdAt ? new Date(o.createdAt) : new Date();
      // compute revenue: prefer o.total, fallback to sum of items
      let revenue = 0;
      if (typeof o.total === "number") revenue = o.total;
      else {
        const its = Array.isArray(o.items) ? o.items : [];
        revenue = its.reduce((s, it) => s + ((Number(it.cost ?? it.amount) || 0) * (Number(it.qty ?? it.quantity) || 0)), 0);
      }
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      map.set(monthStart, (map.get(monthStart) || 0) + revenue);
    }
    // convert map to sorted array
    const arr = Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([ts, revenue]) => {
      const d = new Date(ts);
      const label = d.toLocaleString(undefined, { month: "short", year: "numeric" }); // e.g. "Sep 2025"
      return { month: label, revenue };
    });
    // ensure at least last 6 months (fill 0s if needed)
    if (arr.length === 0) {
      const now = new Date();
      const build = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        build.push({ month: d.toLocaleString(undefined, { month: "short", year: "numeric" }), revenue: 0 });
      }
      return build;
    }
    return arr;
  }, [dataOrders]);

  // Revenue by category - try to map item -> product -> category
  const revenueByCategory = useMemo(() => {
    const map = new Map();
    for (const it of flattenedItems) {
      let category = "Unknown";
      if (it.productId && productIndex.has(it.productId)) {
        category = productIndex.get(it.productId).category ?? category;
      } else if (it.name && productIndex.has(it.name.toLowerCase())) {
        category = productIndex.get(it.name.toLowerCase()).category ?? category;
      } else {
        // try to lookup by name case-insensitive in products array
        const found = products.find(p => p.name && it.name && p.name.toLowerCase() === it.name.toLowerCase());
        if (found) category = found.category ?? category;
      }
      map.set(category, (map.get(category) || 0) + (it.amount || 0) * (it.qty || 1));
    }
    const arr = Array.from(map.entries()).map(([category, value]) => ({ category, value }));
    arr.sort((a, b) => b.value - a.value);
    // If empty, return sample categories with zero
    if (arr.length === 0) return [{ category: "Indoor", value: 0 }, { category: "Outdoor", value: 0 }];
    return arr;
  }, [flattenedItems, productIndex, products]);

  // colors
  const COLORS = ["#16a34a", "#f59e0b", "#3b82f6", "#ef4444", "#a78bfa", "#06b6d4"];

  // If absolutely no orders/data -> show a friendly message + empty charts
  const hasData = dataOrders.length > 0 && flattenedItems.length > 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700">📈 Analytics</h1>
          <p className="text-gray-600">Live charts based on your orders and product data.</p>
        </div>
        <div className="text-sm text-gray-500">
          {hasData ? `${flattenedItems.length} items in ${dataOrders.length} orders` : "No sales data yet"}
        </div>
      </div>

      {/* Sales Over Time */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-green-600 mb-4">📊 Sales Over Time (Revenue)</h2>
        {salesOverTime.length === 0 || !hasData ? (
          <div className="text-gray-500 p-8 text-center">No sales history to display yet.</div>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${v}`} />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Products Sold (bar chart) */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-green-600 mb-4">🌱 Products Sold (Quantity)</h2>
        {productSales.length === 0 || !hasData ? (
          <div className="text-gray-500 p-8 text-center">No product sales yet.</div>
        ) : (
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sold" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Revenue by Category (pie) */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-green-600 mb-4">💰 Revenue by Category</h2>
        {revenueByCategory.length === 0 || !hasData ? (
          <div className="text-gray-500 p-8 text-center">No revenue data by category.</div>
        ) : (
          <div style={{ width: "100%", height: 320 }} className="flex flex-col md:flex-row md:items-center md:gap-6">
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByCategory}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.category}: ${Math.round((entry.value || 0))}`}
                  >
                    {revenueByCategory.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(v) => `₹${v}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 md:mt-0 md:flex-1">
              <h3 className="text-sm text-gray-600 mb-2">Top categories</h3>
              <ul className="space-y-2">
                {revenueByCategory.map((r, i) => (
                  <li key={r.category} className="flex justify-between items-center p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="font-medium">{r.category}</span>
                    </div>
                    <div className="text-sm font-semibold">₹{Math.round(r.value)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
