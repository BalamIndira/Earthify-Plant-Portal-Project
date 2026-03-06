import { Router } from "express";
import multer from "multer";
import { join, extname } from "path";
import { existsSync, mkdirSync } from "fs";
import Product from "../models/Products.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Ensure uploads folder exists
const uploadDir = join(__dirname, "../uploads");
if (!existsSync(uploadDir)) mkdirSync(uploadDir);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + extname(file.originalname)),
});

const upload = multer({ storage });

// Add product
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { name, category, amount, quantity, care, sellerId } = req.body;
    let careObj = {};
    try {
      careObj = JSON.parse(care);
    } catch {}

    const imagePaths = req.files.map(
      (f) => `${req.protocol}://${req.get("host")}/uploads/${f.filename}`
    );

    const product = new Product({
      name,
      category,
      amount: Number(amount),
      quantity: Number(quantity),
      care: careObj,
      images: imagePaths,
      sellerId,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});






// Delete product
router.put("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Mark product as deleted
    product.status = "deleted";
    await product.save();

    // Store in History
    await History.create({
      productId: product._id,
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      amount: product.amount,
      status: product.status,
      images: product.images,
      care: product.care,
    });

    res.json({ message: "Product deleted and saved to history", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Get product history
router.get("/history", async (req, res) => {
  try {
    const products = await Product.find(); // No filter on status
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product history" });
  }
});

export default router;
