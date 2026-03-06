import { Schema, model } from "mongoose";

const buyerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    address: { type: String },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default model("Buyer", buyerSchema);
