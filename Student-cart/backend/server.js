// Backend Server - Reboot to load comboPacks component fixes
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
const { protect, admin } = require('./middleware/auth');
const upload = require('./config/multerConfig');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.post('/api/products/add', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    if (typeof productData.sizes === 'string') {
      productData.sizes = productData.sizes.split(',').map(s => s.trim());
    }
    if (typeof productData.colors === 'string') {
      productData.colors = productData.colors.split(',').map(c => c.trim());
    }

    const product = new Product(productData);
    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding product', error: error.message });
  }
});

app.put('/api/products/update/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (typeof updateData.sizes === 'string') {
      updateData.sizes = updateData.sizes.split(',').map(s => s.trim());
    }
    if (typeof updateData.colors === 'string') {
      updateData.colors = updateData.colors.split(',').map(c => c.trim());
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      updateData,
      { new: true }
    );
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating product', error: error.message });
  }
});

app.delete('/api/products/delete/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
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

const User = require('./models/User');

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ============================================
// STUDENT VERIFICATION ROUTES
// ============================================

app.post('/api/users/verify', protect, upload.single('studentId'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a valid student ID' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }

    user.studentIdUrl = `/uploads/${req.file.filename}`;
    user.isStudentVerified = true; // Auto-verify for portfolio demo
    await user.save();

    res.json({
      success: true,
      message: 'Student ID verified successfully!',
      data: { isStudentVerified: user.isStudentVerified }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
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

app.post('/api/combo-packs', protect, admin, async (req, res) => {
  try {
    const comboPack = new ComboPack(req.body);
    const createdComboPack = await comboPack.save();
    res.status(201).json({ success: true, data: createdComboPack });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding combo pack', error: error.message });
  }
});

// ============================================
// ORDERS ROUTES
// ============================================

// Create new order (Protected)
app.post('/api/orders/create', protect, async (req, res) => {
  try {
    const { customerName, phoneNumber, shippingAddress, orderedItems, totalAmount, paymentMethod, razorpayPaymentId } = req.body;

    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const order = new Order({
      userId: req.user._id,
      customerName,
      phoneNumber,
      shippingAddress,
      orderedItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Razorpay' ? 'Paid' : 'Pending',
      razorpayPaymentId
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', data: createdOrder });
  } catch (error) {
    console.error('Order Creation Error Details:', error);
    res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
});

// Get user orders (Protected)
app.get('/api/orders/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Admin Get all orders
app.get('/api/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name email').sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Admin Update Order Status
app.put('/api/orders/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    order.orderStatus = req.body.status;
    const updatedOrder = await order.save();
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order status' });
  }
});

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with dummy keys if env vars are missing
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
  key_secret: process.env.RAZORPAY_SECRET || 'dummysecret456'
});

// ============================================
// PAYMENT ROUTES (RAZORPAY)
// ============================================

app.post('/api/payment/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    // amount is in INR, Razorpay expects paise (amount * 100)
    const options = {
      amount: Math.round(amount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    let order;
    if (!process.env.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET === 'dummysecret456') {
      // Mock Razorpay order for Demo Mode
      order = {
        id: `order_demo_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created'
      };
    } else {
      order = await razorpay.orders.create(options);
    }
    
    res.json({
      success: true,
      data: order,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123'
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
});

app.post('/api/payment/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // For portfolio demo purposes: if using dummy keys, skip strict signature validation
    if (!process.env.RAZORPAY_SECRET) {
      return res.json({ success: true, message: 'Payment verified successfully (Demo Mode)' });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment verification failed' });
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
