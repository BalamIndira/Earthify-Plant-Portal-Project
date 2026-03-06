import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart for user (create if not exists)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = await Cart.create({ userId, items: [] });
    res.json(cart);
  } catch (err) {
    console.error("GET /cart error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST add/change item: { productId, change, qty, name, price, image }
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, change, qty, name, price, image } = req.body;
    if (!productId)
      return res.status(400).json({ error: "productId required" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const idx = cart.items.findIndex((it) => it.productId === productId);
    if (idx === -1) {
      const insertQty =
        typeof change === "number"
          ? Math.max(1, change)
          : Math.max(1, qty || 1);
      cart.items.push({ productId, qty: insertQty, name, price, image });
    } else {
      if (typeof change === "number")
        cart.items[idx].qty = Math.max(0, cart.items[idx].qty + change);
      else if (typeof qty === "number") cart.items[idx].qty = Math.max(0, qty);
      if (cart.items[idx].qty === 0) cart.items.splice(idx, 1);
      else {
        if (name) cart.items[idx].name = name;
        if (price !== undefined) cart.items[idx].price = price;
        if (image) cart.items[idx].image = image;
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("POST /cart error:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// DELETE remove single product
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });
    cart.items = cart.items.filter((it) => it.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("DELETE /cart error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// DELETE clear cart
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { upsert: true });
    res.json({ success: true });
  } catch (err) {
    console.error("CLEAR /cart error:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
