import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["buyer", "seller", "delivery", "admin"],
    default: "buyer",
  },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
