import { Router } from "express";
import History from "../models/HistoryModel.js";

const router = Router();

// ✅ Get all history products
router.get("/", async (req, res) => {
  try {
    const historyProducts = await History.find().sort({ updatedAt: -1 }); // latest first
    res.status(200).json(historyProducts);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// ✅ Add history product (optional, if needed)
router.post("/", async (req, res) => {
  try {
    const historyProduct = new History(req.body);
    await historyProduct.save();
    res.status(201).json(historyProduct);
  } catch (err) {
    console.error("Error adding history:", err);
    res.status(500).json({ error: "Failed to create history record" });
  }
});

router.put('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted', updatedAt: new Date() },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
