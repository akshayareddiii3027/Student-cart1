require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const createDefaultAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@studentcart.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log('Existing user updated to admin role.');
      } else {
        console.log('Admin user already exists.');
      }
    } else {
      const adminUser = new User({
        name: 'Super Admin',
        email: adminEmail,
        password: 'admin123', // Will be hashed by pre-save hook
        role: 'admin'
      });
      await adminUser.save();
      console.log('Default admin user created successfully!');
    }

    process.exit();
  } catch (error) {
    console.error(`Error creating admin: ${error.message}`);
    process.exit(1);
  }
};

createDefaultAdmin();
