const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Models
const Product = require('./models/Product');
const ComboPack = require('./models/ComboPack');
const Order = require('./models/Order');

// Routes
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const aggregatorRoutes = require('./routes/aggregatorRoutes');
const { protect } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/aggregate', aggregatorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ============================================
// PRODUCTS ROUTES
// ============================================

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.get('/api/products/category/:category', async (req, res) => {
  try {
    const categoryProducts = await Product.find({ category: { $regex: new RegExp(`^${req.params.category}$`, 'i') } });
    res.json({ success: true, count: categoryProducts.length, data: categoryProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ============================================
// COMBO PACKS ROUTES
// ============================================

app.get('/api/combo-packs', async (req, res) => {
  try {
    const comboPacks = await ComboPack.find({});
    res.json({ success: true, count: comboPacks.length, data: comboPacks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ============================================
// ORDERS ROUTES
// ============================================

// Create new order (Protected)
app.post('/api/orders', protect, async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user._id,
      items,
      paymentMethod,
      shippingAddress,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
});

// Get user orders (Protected)
app.get('/api/orders/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ============================================
// START SERVER
// ============================================

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   StudentCart Backend Server Running   ║
║   Port: ${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}         ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
