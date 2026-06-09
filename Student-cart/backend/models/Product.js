const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Trendy Outfits', 'Essentials', 'Electronics', 'Mobile Subscriptions', 'Combo Packs']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
