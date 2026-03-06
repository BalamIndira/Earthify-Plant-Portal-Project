import mongoose from "mongoose";

// Care sub-schema
const careSchema = new mongoose.Schema(
  {
    watering: { type: String, default: "" },
    sunlight: { type: String, default: "" },
    soil: { type: String, default: "" },
    fertilizer: { type: String, default: "" },
    temperature: { type: String, default: "" },
    extraTips: { type: String, default: "" },
  },
  { _id: false }
);

// Main Product schema
const productSchema = new mongoose.Schema(
  {
    sellerId: { type: String, required: true },
    buyerId: { type: String, default: null },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    amount: { type: Number, required: true },
    images: { type: [String], required: true, validate: (v) => v.length > 0 },
    sellerName: { type: String, default: "Unknown Seller" },
    care: { type: careSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
