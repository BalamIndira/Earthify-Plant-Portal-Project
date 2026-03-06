import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { ProductContext } from "../../context/ProductContext";

const PLACEHOLDER = "https://via.placeholder.com/120x120?text=No+Image";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("demoUserId") || "demo-user";

  const {
    wishlist: ctxWishlist,
    fetchWishlistFromServer,
    removeFromWishlistApi,
  } = useContext(ProductContext) || {};

  // get API origin from axios.baseURL (strip trailing /api if present)
  const API_ORIGIN = (() => {
    try {
      const base = axios.defaults.baseURL || "";
      return base.replace(/\/api\/?$/, "") || window.location.origin;
    } catch {
      return window.location.origin;
    }
  })();

  // robust image resolver
  const resolveImageUrl = (item) => {
    if (!item) return PLACEHOLDER;

    const candidates = [
      item.imageUrl,
      item.image,
      // if image is an object { url: '...' } or { src: '...' }
      typeof item.image === "object" && (item.image?.url || item.image?.src),
      // product nested
      item.product?.image,
      item.product?.imageUrl,
      item.product?.images?.[0],
      // flat images arrays
      item.images?.[0],
      // some backends store media array under media or photos
      item.media?.[0],
      item.photos?.[0],
    ];

    for (let c of candidates) {
      if (!c) continue;
      if (typeof c === "object") c = c.url || c.src || "";
      if (!c) continue;
      // if relative path (starts with /) or doesn't look like absolute URL, prefix API origin
      if (c.startsWith("http://") || c.startsWith("https://")) return c;
      if (c.startsWith("//")) return window.location.protocol + c;
      // handle paths like /uploads/..., images stored on backend
      if (c.startsWith("/")) return `${API_ORIGIN}${c}`;
      // otherwise, may be a filename or relative path — try prefixing API_ORIGIN
      return `${API_ORIGIN}/${c}`.replace(/([^:]\/)\/+/g, "$1");
    }

    return PLACEHOLDER;
  };

  // keep local list in sync with context wishlist -> server/localStorage fallback
  useEffect(() => {
    if (Array.isArray(ctxWishlist) && ctxWishlist.length >= 0) {
      setWishlistItems(ctxWishlist);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(ctxWishlist));
      } catch {}
      return;
    }
    // if context doesn't have wishlist, try server then localStorage
    const load = async () => {
      try {
        if (typeof fetchWishlistFromServer === "function") {
          const data = await fetchWishlistFromServer();
          setWishlistItems(Array.isArray(data) ? data : []);
          return;
        }
        const res = await axios.get(`/wishlist`, { params: { userId } });
        setWishlistItems(
          Array.isArray(res.data) ? res.data : res.data?.items || []
        );
      } catch (err) {
        const local = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
        setWishlistItems(Array.isArray(local) ? local : []);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxWishlist]);

  // Remove item from wishlist (tries context API then server then local)
  const removeItem = async (wishlistIdOrProductId) => {
    try {
      if (typeof removeFromWishlistApi === "function") {
        await removeFromWishlistApi(wishlistIdOrProductId);
      } else {
        await axios.delete(`/wishlist/${wishlistIdOrProductId}`, {
          params: { userId },
        });
      }
    } catch (err) {
      console.warn("Remove wishlist item failed on server:", err);
    } finally {
      // update local state / storage regardless
      const filtered = (wishlistItems || []).filter(
        (it) => (it._id || it.productId || it.id) !== wishlistIdOrProductId
      );
      setWishlistItems(filtered);
      try {
        localStorage.setItem("wishlistItems", JSON.stringify(filtered));
      } catch {}
    }
  };

  return (
    <div className="min-h-screen p-6">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-6 bg-gradient-to-b from-green-50 via-lime-50 to-emerald-50">
        <h2 className="text-3xl font-extrabold mb-8 text-purple-900 text-center drop-shadow-md">
          💖 Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-lg text-center">
            <p className="text-purple-900 text-lg font-semibold">
              Your wishlist is currently empty.
            </p>
            <button
              onClick={() => navigate("/buyer")}
              className="mt-6 px-6 py-3 bg-green-400 text-white rounded-2xl shadow-lg hover:bg-purple-800 transition font-semibold focus:outline-none focus:ring-4 focus:ring-purple-400"
            >
              ⬅ Back to Buyer
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {wishlistItems.map((item) => {
              const title =
                item.name || item.title || item.product?.name || "Product";
              const amount =
                Number(
                  item.amount ??
                    item.price ??
                    item.product?.amount ??
                    item.product?.price
                ) || 0;
              const src = resolveImageUrl(item);
              const id = item._id || item.productId || item.id || title;

              return (
                <div
                  key={id || Math.random().toString(36).slice(2, 9)}
                  className="flex flex-col sm:flex-row items-center bg-white bg-opacity-60 backdrop-blur-lg p-5 rounded-3xl shadow-lg shadow-purple-400/50 hover:shadow-purple-600 transition-all"
                >
                  <img
                    src={src}
                    alt={title}
                    onError={(e) => {
                      if (e?.target) e.target.src = PLACEHOLDER;
                    }}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-purple-300 shadow-md"
                    loading="lazy"
                  />
                  <div className="flex flex-col flex-grow ml-0 sm:ml-6 mt-4 sm:mt-0 text-purple-900">
                    <p className="font-bold text-xl truncate">{title}</p>
                    <p className="mt-1 text-purple-800 text-lg font-semibold">
                      ₹{amount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(id || item._id || item.productId || item.id)
                    }
                    className="mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-red-600 text-white text-lg rounded-full shadow-lg hover:bg-red-700 transition focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/buyer")}
              className="px-8 py-3 bg-green-300 text-white rounded-3xl shadow-xl hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-400 transition font-bold text-lg"
            >
              ⬅ Back to Buyer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
