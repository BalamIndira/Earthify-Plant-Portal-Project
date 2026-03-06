import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import buyerRoutes from "./routes/buyerRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Dynamic route loader (fallback if file missing)
const loadRoute = async (pathStr, fallbackMsg) => {
  try {
    return (await import(pathStr)).default;
  } catch (e) {
    const router = express.Router();
    router.get("/", (req, res) => res.json({ message: fallbackMsg }));
    return router;
  }
};

// Routes to load
let feedbackRoutes, historyRoutes, cartRoutes, paymentRoutes, orderRoutes;

// Load routes async
(async () => {
  feedbackRoutes = await loadRoute(
    "./routes/feedbackRoutes.js",
    "Feedback route not implemented"
  );

  historyRoutes = await loadRoute(
    "./routes/historyRoutes.js",
    "History route not implemented"
  );

  cartRoutes = await loadRoute(
    "./routes/cartRoutes.js",
    "Cart route not implemented"
  );

  paymentRoutes = await loadRoute(
    "./routes/paymentRoutes.js",
    "Payment route not implemented"
  );

  // ⭐ NEW → Delivery / Orders Route (Required for delivery dashboard)
  orderRoutes = await loadRoute(
    "./routes/orderRoutes.js",
    "Order route not implemented"
  );

  // Register all routes
  app.use("/api/products", productRoutes);
  app.use("/api/buyers", buyerRoutes);
  // mount auth (login/register)
  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/payment", paymentRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/history", historyRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/wishlist", wishlistRoutes);

  // ⭐ NEW: Delivery / Order Management
  app.use("/api/orders", orderRoutes);

  // MongoDB connect
  const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/earthify_db";
  mongoose
    .connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");
      console.log(`Connected to: ${MONGO.split("@")[1]?.split("?")[0] || "local db"}`);
    })
    .catch((e) => {
      console.error("❌ MongoDB connection error:", e.message);
      console.log("⚠️  Retrying connection in 5 seconds...");
      setTimeout(() => {
        mongoose.connect(MONGO, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).catch(err => console.error("❌ Retry failed:", err.message));
      }, 5000);
    });

  // Health check
  app.get("/", (req, res) => res.send("🌱 Plant Store Backend Running..."));

  // Start server
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );

  // Global error handling
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => process.exit(1));
  });
})();
