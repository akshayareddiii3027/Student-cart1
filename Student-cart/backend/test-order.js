const axios = require('axios');

async function testOrder() {
  try {
    // 1. Get token by logging in
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@studentcart.com',
      password: 'admin@123'
    });
    const token = loginRes.data.token;

    // 2. Create order
    const orderData = {
      customerName: "Test",
      phoneNumber: "1234567890",
      shippingAddress: {
        address: "123 Main St",
        city: "City",
        postalCode: "12345",
        country: "Country"
      },
      orderedItems: [{
        productId: "1",
        productName: "Test Product",
        quantity: 1,
        price: 10,
        image: "test.jpg"
      }],
      totalAmount: 10,
      paymentMethod: "Cash on Delivery",
      orderStatus: "Order Placed",
      orderDate: new Date()
    };

    const res = await axios.post('http://localhost:5000/api/orders/create', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.log("Error:", err.response?.data);
  }
}

testOrder();
