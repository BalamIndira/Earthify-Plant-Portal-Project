import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  productId: { type: String, required: false }, // optional if related to a product
  text: { type: String, required: true },
  status: { type: String, enum: ["pending", "solved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
