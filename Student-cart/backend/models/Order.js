const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  customerName: { type: String },
  phoneNumber: { type: String },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  orderedItems: [{
    productId: { type: String },
    productName: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String }
  }],
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'],
    default: 'Order Placed'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDays: {
    type: String,
    default: '3-5'
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
