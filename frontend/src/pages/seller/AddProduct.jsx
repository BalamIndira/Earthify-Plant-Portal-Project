// src/pages/products/AddProduct.jsx
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function AddProduct() {
  const { products, setProducts } = useContext(ProductContext);

  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
    quantity: 1,
    images: [],
    care: {
      watering: "",
      sunlight: "",
      soil: "",
      fertilizer: "",
      temperature: "",
      extraTips: "",
    },
  });

  const [showOptional, setShowOptional] = useState(false);

  const categoriesList = [
    "Vegetables", "Fruits", "Succulents", "Cactus", "Flowers",
    "Indoor", "Herbs-Medicinal", "Creepers", "Climbers",
  ];

  // Load all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCareChange = (e) => setForm({ ...form, care: { ...form.care, [e.target.name]: e.target.value } });

  const handleQuantity = (type) =>
    setForm(prev => ({ ...prev, quantity: type === "inc" ? prev.quantity + 1 : Math.max(prev.quantity - 1, 1) }));

  const addImageField = () => setForm(prev => ({ ...prev, images: [...prev.images, ""] }));
  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("amount", form.amount);
      data.append("quantity", form.quantity);
      data.append("sellerId", "defaultSeller"); 
      data.append("care", JSON.stringify(form.care));

      form.images.forEach(img => {
        if (img instanceof File) data.append("images", img);
        else if (typeof img === "string" && img.startsWith("http")) data.append("imageUrls", img);
      });

      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add product");
      }

      alert("✅ Product added successfully!");
      setForm({
        name: "",
        category: "",
        amount: "",
        quantity: 1,
        images: [],
        care: { watering: "", sunlight: "", soil: "", fertilizer: "", temperature: "", extraTips: "" },
      });

      // Reload products
      const allProductsRes = await fetch("http://localhost:5000/api/products");
      const allProductsData = await allProductsRes.json();
      setProducts(allProductsData);

    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-lg md:max-w-xl mx-auto bg-gradient-to-br from-green-50 via-green-100 to-green-50 p-6 md:p-8 shadow-xl rounded-xl mt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-green-800 text-center">➕ Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Product Name */}
        <div>
          <label className="block font-semibold text-green-700 mb-1">Product Name *</label>
          <input name="name" type="text" placeholder="Enter Product Name" value={form.name} onChange={handleChange} className="w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-green-700 mb-1">Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required>
            <option value="">-- Select Category --</option>
            {categoriesList.map((cat, i) => (<option key={i} value={cat}>{cat}</option>))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-green-700 mb-1">Price (₹) *</label>
          <input name="amount" type="number" placeholder="Enter Price" value={form.amount} onChange={handleChange} className="w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold text-green-700 mb-1">Quantity *</label>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => handleQuantity("dec")} className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded-lg transition">➖</button>
            <span className="px-4 font-semibold">{form.quantity}</span>
            <button type="button" onClick={() => handleQuantity("inc")} className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded-lg transition">➕</button>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold text-green-700 mb-1">Images *</label>
          {form.images.map((img, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              {typeof img === "string" ? (
                <input type="text" placeholder="Enter Image URL" value={img} onChange={(e) => handleImageChange(index, e.target.value)} className="flex-1 border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" />
              ) : (
                <span className="text-gray-500">{img.name}</span>
              )}
              {img && typeof img === "string" && <img src={img} alt="preview" className="w-14 h-14 object-cover rounded-lg border-2 border-green-300" />}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2">➕ Add Image URL</button>
          <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="block w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" />
        </div>

        {/* Optional Care Details */}
        <div>
          <button type="button" onClick={() => setShowOptional(!showOptional)} className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 transition">{showOptional ? "▲ Hide Care Details" : "▼ Add Care Details"}</button>
        </div>

        {showOptional && (
          <div className="space-y-4 border-2 border-green-200 p-4 rounded-lg bg-green-50 mt-2">
            <h3 className="text-lg font-semibold text-green-700">🌱 Care & Maintenance</h3>
            {["watering","sunlight","soil","fertilizer","temperature"].map(field => (
              <div key={field}>
                <label className="block font-medium text-green-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type="text" name={field} placeholder={`Enter ${field}`} value={form.care[field]} onChange={handleCareChange} className="w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" />
              </div>
            ))}
            <div>
              <label className="block font-medium text-green-700 mb-1">Additional Tips</label>
              <textarea name="extraTips" placeholder="Enter additional care tips..." value={form.care.extraTips} onChange={handleCareChange} className="w-full border-2 border-green-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" rows="3"/>
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition">Add Product</button>
      </form>
    </div>
  );
}
