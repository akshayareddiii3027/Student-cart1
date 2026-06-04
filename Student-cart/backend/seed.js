require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Models
const Product = require('./models/Product');
const ComboPack = require('./models/ComboPack');

// Datasets
const productsData = require('../database/products');
const comboPacksData = require('../database/comboPacks');

const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Product.deleteMany();
    await ComboPack.deleteMany();

    console.log('Inserting products...');
    await Product.insertMany(productsData);

    console.log('Inserting combo packs...');
    await ComboPack.insertMany(comboPacksData);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();
