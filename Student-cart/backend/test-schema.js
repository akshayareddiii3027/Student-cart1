const mongoose = require('mongoose');
const Order = require('./models/Order');

async function testInsert() {
  await mongoose.connect('mongodb://127.0.0.1:27017/studentcart_test?authSource=admin');
  
  try {
    const order = new Order({
      userId: new mongoose.Types.ObjectId(),
      customerName: "Test Name",
      phoneNumber: "1234567890",
      shippingAddress: {
        address: "123 Street",
        city: "City",
        postalCode: "12345",
        country: "Country"
      },
      orderedItems: [{
        productId: "1",
        productName: "Product",
        quantity: 1,
        price: 100,
        image: "/test.jpg"
      }],
      totalAmount: 100,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      razorpayPaymentId: "cod_pending"
    });

    await order.save();
    console.log("SUCCESS!");
  } catch (error) {
    console.error("MONGOOSE ERROR:", error);
  } finally {
    process.exit(0);
  }
}

testInsert();
