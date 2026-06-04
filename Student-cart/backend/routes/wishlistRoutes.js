const express = require('express');
const { protect } = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const router = express.Router();

// @route   GET /api/wishlist
// @desc    Get user wishlist
router.get('/', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.json({ success: true, data: [] });
    }
    
    // Fetch product details for each product ID
    const products = await Product.find({ id: { $in: wishlist.products } });
    
    // Map them into expected format
    const formattedWishlist = products.map(product => ({
      product: product
    }));
    
    res.json({ success: true, data: formattedWishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/wishlist
// @desc    Add product to wishlist
router.post('/', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    const products = await Product.find({ id: { $in: wishlist.products } });
    const formattedWishlist = products.map(product => ({ product }));
    
    res.status(201).json({ success: true, data: formattedWishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
router.delete('/:productId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      id => id.toString() !== req.params.productId
    );
    await wishlist.save();

    const products = await Product.find({ id: { $in: wishlist.products } });
    const formattedWishlist = products.map(product => ({ product }));
    
    res.json({ success: true, data: formattedWishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
