const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../models/Product');
const ComboPack = require('../models/ComboPack');
const productsData = require('../../database/products');
const comboPacksData = require('../../database/comboPacks');

let mongoServer;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentcart';
    
    try {
      console.log('Attempting to connect to local/remote MongoDB...');
      const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.log('Local MongoDB not running. Falling back to In-Memory MongoDB Server...');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB In-Memory Server Connected: ${conn.connection.host}`);
    }

    // Force wipe and seed data on startup to load new items
    console.log('Wiping database and seeding initial data...');
    await Product.deleteMany({});
    await ComboPack.deleteMany({});
    
    // Also ensure Admin user exists on boot for in-memory databases
    const User = require('../models/User');
    const adminEmail = 'admin@studentcart.com';
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = new User({
        name: 'Super Admin',
        email: adminEmail,
        password: 'admin@123', // Will be hashed by pre-save hook
        role: 'admin'
      });
      await adminUser.save();
    } else {
      // If user exists but has wrong password/role, force update it for testing
      adminUser.password = 'admin@123';
      adminUser.role = 'admin';
      await adminUser.save();
    }

    await Product.insertMany(productsData);
    await ComboPack.insertMany(comboPacksData);
    console.log('Successfully seeded Products, Combo Packs, and Default Admin!');

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
