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

    // Seed data on startup if database is empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Database is empty. Seeding initial data...');
      await Product.insertMany(productsData);
      await ComboPack.insertMany(comboPacksData);
      console.log('Successfully seeded Products and Combo Packs!');
    }

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
