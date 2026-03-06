const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  amount: Number,
  quantity: Number,
  images: [String],
  care: {
    watering: String,
    sunlight: String,
    temperature: String,
    extraTips: String,
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'deleted'],
    default: 'pending'
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
