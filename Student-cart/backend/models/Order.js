const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [{
    productId: { type: Number },
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String }
  }],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Confirmed'
  },
  deliveryDays: {
    type: String,
    default: '3-5'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
