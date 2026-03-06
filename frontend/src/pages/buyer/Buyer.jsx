import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaBars, FaCommentDots } from "react-icons/fa";
import Footer from "../../components/Footer";
import Details from "./Details";

export default function Buyer() {
  const {
    products,
    addToCartApi,
    addToWishlistApi,
    removeFromWishlistApi,
    cart,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const [approvedProducts, setApprovedProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const approved = products.filter((p) => p.status === "approved");
    const stored =
      JSON.parse(localStorage.getItem("approvedProductsByCategory")) || {};
    const updated = { ...stored };

    approved.forEach((prod) => {
      const cat = prod.category || "Uncategorized";
      if (!updated[cat]) updated[cat] = [];
      const existingIndex = updated[cat].findIndex(
        (p) => p.name.toLowerCase() === prod.name.toLowerCase(),
      );
      if (existingIndex !== -1)
        updated[cat][existingIndex] = {
          ...updated[cat][existingIndex],
          ...prod,
        };
      else updated[cat].push(prod);
    });

    setApprovedProducts(updated);
    localStorage.setItem("approvedProductsByCategory", JSON.stringify(updated));
  }, [products]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlist(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    setCartItems(cart.items || []);
  }, [cart]);

  const dynamicCategories = Object.keys(approvedProducts);
  const filteredProducts = selectedCategory
    ? approvedProducts[selectedCategory] || []
    : Object.values(approvedProducts).flat();

  const handleCartChange = async (product, type) => {
    const pid = product._id || product.id;
    const existingItem = cartItems.find(
      (item) => (item.productId || item._id || item.id) === pid,
    );
    const qty = existingItem ? existingItem.qty : 0;

    // increment
    if (type === "inc") {
      if (product.quantity && qty >= product.quantity) {
        alert("❌ Stock limit reached!");
        return;
      }
      try {
        const updatedCart = await addToCartApi(pid, 1, product);
        // addToCartApi returns the updated cart object (items[])
        setCartItems(updatedCart?.items || updatedCart || []);
      } catch (err) {
        console.error("Add to cart failed", err);
      }
      return;
    }

    // decrement
    if (type === "dec") {
      if (qty <= 0) return;
      try {
        const updatedCart = await addToCartApi(pid, -1, product);
        setCartItems(updatedCart?.items || updatedCart || []);
      } catch (err) {
        console.error("Decrease cart qty failed", err);
      }
      return;
    }
  };

  const handleWishlistToggle = async (product) => {
    const pid = product._id || product.id;
    const exists = wishlist.find(
      (item) => (item._id || item.id || item.productId) === pid,
    );

    if (exists) {
      // remove from wishlist (try context API first)
      const idToRemove = exists._id || exists.productId || pid;
      try {
        if (typeof removeFromWishlistApi === "function") {
          await removeFromWishlistApi(idToRemove);
        }
      } catch (err) {
        console.warn("removeFromWishlistApi failed", err);
      }
      const updated = wishlist.filter(
        (item) => (item._id || item.id || item.productId) !== pid,
      );
      setWishlist(updated);
      localStorage.setItem("wishlistItems", JSON.stringify(updated));
    } else {
      // add to wishlist (use full product snapshot)
      try {
        if (typeof addToWishlistApi === "function") {
          await addToWishlistApi(product);
        }
      } catch (err) {
        console.warn("addToWishlistApi failed", err);
      }
      const updated = [...wishlist, product];
      setWishlist(updated);
      localStorage.setItem("wishlistItems", JSON.stringify(updated));
    }
  };

  const handleToggleDetails = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));
  const handleBuyNow = (product) => {
    const pid = product._id || product.id;
    navigate("/billing", {
      state: {
        order: [{ productId: pid, qty: 1 }],
        customer: {
          name: "Demo User",
          address: "Demo Address",
          phone: "0000000000",
        },
        product,
      },
    });
  };

  const sendFeedback = async () => {
    if (!feedback) return;
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:4000"}/api/admin/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            feedback,
            timestamp: new Date().toISOString(),
          }),
        },
      );
      setStatus("✅ Feedback sent!");
      setFeedback("");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send feedback");
    }
  };

  const handleAdd = async (product) => {
    const pid = product._id || product.id || product.productId;
    const updated = await addToCartApi(pid, 1, {
      name: product.name || product.title,
      amount: product.amount || product.price,
      images: product.images || [product.image],
    });
    // optional local update or navigation
    console.log("cart updated", updated);
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-lime-50 to-amber-50 min-h-screen">
      <Navbar />

      {/* Floating Menu Button (shifted just below Navbar) */}

      <Details />
      <div className="pt-8 flex flex-col md:flex-row px-4 md:px-3 pb-12">
        <aside className="md:w-45 w-full mr-5 md:h-[calc(100vh-5.5rem)] sticky top-[4rem] bg-white bg-opacity-300 backdrop-blur-md p-4 rounded-lg shadow-green-400 shadow-md z-20 mb-6 md:mb-0">
          <h2 className="text-lg font-extrabold mb-4 text-green-800 drop-shadow-md">
            🌿 Categories
          </h2>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer py-2 px-3 rounded-md font-semibold transition-colors duration-150 ${
                selectedCategory === ""
                  ? "bg-green-400 text-white shadow-lg"
                  : "hover:bg-green-200 text-green-700"
              }`}
            >
              All
            </li>
            {dynamicCategories.map((cat, i) => (
              <li
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer py-2 px-3 rounded-md font-semibold transition-colors duration-150 ${
                  selectedCategory === cat
                    ? "bg-green-400 text-white shadow-lg"
                    : "hover:bg-green-200 text-green-700"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No products available
            </p>
          ) : (
            filteredProducts.map((product) => {
              const pid = product._id || product.id;
              const cartItem = cartItems.find(
                (item) => (item._id || item.id) === pid,
              );
              const isWishlisted = wishlist.some(
                (item) => (item._id || item.id) === pid,
              );

              return (
                <ProductCard
                  key={pid}
                  product={product}
                  qty={cartItem ? cartItem.qty : 0}
                  isWishlisted={isWishlisted}
                  onCartChange={handleCartChange}
                  onWishlistToggle={() => handleWishlistToggle(product)}
                  expanded={expandedId === pid}
                  onToggleDetails={() => handleToggleDetails(pid)}
                  onBuyNow={() => handleBuyNow(product)}
                  className="shadow-green-300 hover:shadow-green-500 transition-shadow"
                />
              );
            })
          )}
        </main>
      </div>

      {/* Feedback Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setFeedbackOpen((prev) => !prev)}
          className="bg-green-600 text-white p-4 rounded-full shadow-green-500 shadow-lg hover:bg-green-700 transition focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Open feedback form"
        >
          <FaCommentDots size={22} />
        </button>
      </div>

      {/* Feedback Form */}
      {feedbackOpen && (
        <div className="fixed bottom-24 right-6 w-64 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-green-400 shadow-lg p-5 z-50 ring-1 ring-white ring-opacity-20 overflow-hidden animate-fadeIn">
          <h4 className="text-lg font-semibold mb-3 text-green-700 drop-shadow-md">
            Send Feedback
          </h4>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your feedback here..."
            rows={4}
            className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mb-3 bg-white bg-opacity-70"
          />
          <button
            onClick={sendFeedback}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold shadow-green-400 shadow"
          >
            Send
          </button>
          {status && (
            <p className="mt-2 text-center text-sm text-green-700 select-none drop-shadow-sm">
              {status}
            </p>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
      <Footer />
    </div>
  );
}
