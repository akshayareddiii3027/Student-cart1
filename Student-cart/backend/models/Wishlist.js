const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [{
    type: String, // Storing product IDs as strings to support both local numbers and external string IDs
  }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
