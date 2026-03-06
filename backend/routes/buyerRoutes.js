import express from "express";
import Buyer from "../models/Buyer.js";

const router = express.Router();

// GET all buyers
router.get("/", async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch buyers" });
  }
});

// ...other buyer routes...

export default router;
