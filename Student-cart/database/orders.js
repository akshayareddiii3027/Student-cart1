// Orders Dataset - In-memory storage (can be replaced with database)
let orders = [];
let orderIdCounter = 10001;

const orderMethods = {
  // Add new order
  addOrder: (orderData) => {
    const newOrder = {
      orderId: orderIdCounter++,
      ...orderData,
      createdAt: new Date(),
      status: "Confirmed"
    };
    orders.push(newOrder);
    return newOrder;
  },

  // Get all orders
  getAllOrders: () => orders,

  // Get order by ID
  getOrderById: (orderId) => orders.find(o => o.orderId === orderId),

  // Get user's orders
  getUserOrders: (userId) => orders.filter(o => o.userId === userId),

  // Update order status
  updateOrderStatus: (orderId, status) => {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = status;
    }
    return order;
  },

  // Delete order
  deleteOrder: (orderId) => {
    orders = orders.filter(o => o.orderId !== orderId);
  }
};

module.exports = orderMethods;
