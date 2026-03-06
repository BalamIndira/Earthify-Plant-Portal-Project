import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    qty: { type: Number, required: true, default: 1 },
    name: { type: String },
    price: { type: Number, default: 0 },
    image: { type: String },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
