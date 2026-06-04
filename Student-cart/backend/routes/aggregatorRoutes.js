const express = require('express');
const { searchExternalProducts } = require('../services/scraperService');
const router = express.Router();

// @route   GET /api/aggregate
// @desc    Search for products from external sources (Amazon, Flipkart)
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter "q" is required' });
    }

    const externalProducts = await searchExternalProducts(query);
    
    res.json({
      success: true,
      count: externalProducts.length,
      data: externalProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during aggregation', error: error.message });
  }
});

module.exports = router;
