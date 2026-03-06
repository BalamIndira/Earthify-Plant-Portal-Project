import { Schema, model } from "mongoose";

const BuyerProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: { type: [String], default: [] },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  care: { type: Object, default: {} },
  status: { type: String, default: "approved" },
}, { timestamps: true });

export default model("BuyerProduct", BuyerProductSchema);
