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
    "Feedback route not implemented",
  );

  historyRoutes = await loadRoute(
    "./routes/historyRoutes.js",
    "History route not implemented",
  );

  cartRoutes = await loadRoute(
    "./routes/cartRoutes.js",
    "Cart route not implemented",
  );

  paymentRoutes = await loadRoute(
    "./routes/paymentRoutes.js",
    "Payment route not implemented",
  );

  // ⭐ NEW → Delivery / Orders Route (Required for delivery dashboard)
  orderRoutes = await loadRoute(
    "./routes/orderRoutes.js",
    "Order route not implemented",
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

  // MongoDB connect
  const MONGO = process.env.MONGO_URI;
  const MONGO_LOCAL = "mongodb://127.0.0.1:27017/earthify_db";

  let dbConnected = false;

  // Try to connect to MongoDB Atlas first
  if (MONGO) {
    console.log("🔄 Attempting to connect to MongoDB Atlas...");
    mongoose
      .connect(MONGO, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        connectTimeoutMS: 10000,
        retryWrites: true,
        w: "majority",
      })
      .then(() => {
        dbConnected = true;
        console.log("✅ MongoDB Atlas connected successfully");
      })
      .catch((e) => {
        console.error("❌ MongoDB Atlas connection failed:", e.message);
        console.log("⚠️  Falling back to local MongoDB...");
        // Try local MongoDB
        connectLocalMongo();
      });
  } else {
    console.log("⚠️  No MongoDB Atlas URI provided, using local MongoDB...");
    connectLocalMongo();
  }

  // Function to connect to local MongoDB
  function connectLocalMongo() {
    mongoose
      .connect(MONGO_LOCAL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      })
      .then(() => {
        dbConnected = true;
        console.log("✅ Local MongoDB connected successfully");
        console.log("🔔 Using local database: earthify_db");
      })
      .catch((err) => {
        console.error("❌ Local MongoDB connection failed:", err.message);
        console.log(
          "📝 Please ensure MongoDB is installed and running locally",
        );
        console.log("📝 Or configure MONGO_URI environment variable");
      });
  }

  // Health check
  app.get("/", (req, res) => res.send("🌱 Plant Store Backend Running..."));

  // Start server
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`),
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
