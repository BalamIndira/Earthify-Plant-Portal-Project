import express from "express";
import Wishlist from "../models/Wishlist.js"; // create model if missing: see note
const router = express.Router();

// GET wishlist for user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Wishlist.find({ userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("GET /wishlist error:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// POST add to wishlist: body { productId, name, price, image }
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, name, price, image } = req.body;
    const item = await Wishlist.create({
      userId,
      productId,
      name,
      price,
      image,
    });
    // return full list after add (frontend expects array)
    const list = await Wishlist.find({ userId }).sort({ createdAt: -1 });
    res.status(201).json(list);
  } catch (err) {
    console.error("POST /wishlist error:", err);
    res.status(500).json({ error: "Failed to add wishlist item" });
  }
});

// DELETE remove by wishlist _id or by productId with query userId
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.query.userId;
    if (userId) {
      // delete by productId for that user
      await Wishlist.deleteOne({ productId: id, userId });
    } else {
      // delete by document id
      await Wishlist.findByIdAndDelete(id);
    }
    const list = userId
      ? await Wishlist.find({ userId }).sort({ createdAt: -1 })
      : [];
    res.json(list);
  } catch (err) {
    console.error("DELETE /wishlist error:", err);
    res.status(500).json({ error: "Failed to remove wishlist item" });
  }
});

export default router;
