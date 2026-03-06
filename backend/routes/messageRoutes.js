import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// 📨 Seller sends a message to admin
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text, productId } = req.body;

    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const msg = new Message({ senderId, receiverId, text, productId });
    await msg.save();

    res.status(201).json(msg);
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Get all messages (for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ updatedAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Admin marks message as solved
router.put("/solve/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: "solved", updatedAt: new Date() },
      { new: true }
    );

    if (!message) return res.status(404).json({ message: "Message not found" });

    res.json(message);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
