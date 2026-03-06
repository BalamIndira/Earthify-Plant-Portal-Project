// backend/models/ProductHistory.js
import mongoose from "mongoose";

const productHistorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  image: String,
  date: Date,
  status: String
});

export default mongoose.model("ProductHistory", productHistorySchema);
