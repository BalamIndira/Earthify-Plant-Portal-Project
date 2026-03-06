import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function SellerManagementPage() {
  const { products, deleteProduct, setProducts } = useContext(ProductContext);
  const fallbackImage = "/fallback.png"; // fallback image in public folder

  // Approve Product
  const handleApprove = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
    );

  // Reject Product
  const handleReject = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p))
    );

  // Render Product Image
  const renderProductImage = (img) => {
    const imgSrc =
      !img || img.length === 0
        ? fallbackImage
        : img[0] instanceof Blob
        ? URL.createObjectURL(img[0])
        : typeof img[0] === "string"
        ? img[0].startsWith("http")
          ? img[0]
          : `/${img[0]}`
        : fallbackImage;

    return <img src={imgSrc} alt="Product" className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-emerald-50 to-lime-100 p-2 sm:p-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-4">
        📦 Seller Product Management
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No products available.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-purple-200 text-left">
                  <th className="border px-2 py-1">Image</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Category</th>
                  <th className="border px-2 py-1">Price</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Seller</th>
                  <th className="border px-2 py-1">Status</th>
                  {/* <th className="border px-2 py-1">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-purple-50">
                    <td className="border px-2 py-1 text-center">{renderProductImage(p.images)}</td>
                    <td className="border px-2 py-1 font-semibold">{p.name}</td>
                    <td className="border px-2 py-1">{p.category}</td>
                    <td className="border px-2 py-1">₹{p.amount}</td>
                    <td className="border px-2 py-1">{p.quantity}</td>
                    <td className="border px-2 py-1">{p.sellerName || "Unknown"}</td>
                    <td className="border px-2 py-1">
                      <span
                        className={`px-2 py-0.5 rounded text-white font-semibold text-xs ${
                          p.status === "approved"
                            ? "bg-green-600"
                            : p.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {p.status || "pending"}
                      </span>
                    </td>
                    {/* <td className="border px-2 py-1 flex gap-1 flex-wrap">
                      <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700" onClick={() => handleApprove(p._id)}>✅</button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleReject(p._id)}>⚠</button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => deleteProduct(p._id)}>❌</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {renderProductImage(p.images)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-indigo-700">{p.name}</h3>
                    <p className="text-xs text-gray-600">{p.category} | Qty: {p.quantity}</p>
                    <p className="text-sm font-semibold text-gray-700">₹{p.amount}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700">Seller: {p.sellerName || "Unknown"}</p>
                {/* <span
                  className={`px-2 py-0.5 rounded text-white font-semibold text-xs ${
                    p.status === "approved"
                      ? "bg-green-600"
                      : p.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {p.status || "pending"}
                </span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700" onClick={() => handleApprove(p._id)}>✅</button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleReject(p._id)}>⚠</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => deleteProduct(p._id)}>❌</button>
                </div> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
