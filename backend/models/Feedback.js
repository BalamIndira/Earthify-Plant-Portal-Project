import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  feedback: { type: String, required: true },
  status: { type: String, default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
