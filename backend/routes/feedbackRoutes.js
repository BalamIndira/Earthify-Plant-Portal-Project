import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { sellerId, feedback, status, timestamp } = req.body;
    if (!sellerId || !feedback) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFeedback = new Feedback({
      sellerId,
      feedback,
      status: status || "pending",
      timestamp: timestamp || new Date(),
    });

    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: "Server error while saving feedback" });
  }
});

// GET feedback by seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ sellerId: req.params.sellerId }).sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching feedback" });
  }
});

// PUT to mark feedback as done
router.put("/:id/done", async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "done" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update feedback" });
  }
});

export default router;
