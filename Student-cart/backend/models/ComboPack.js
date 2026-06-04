const mongoose = require('mongoose');

const comboPackSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4.0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('ComboPack', comboPackSchema);
