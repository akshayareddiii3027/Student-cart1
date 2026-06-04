# Database Datasets

This folder contains all the data sets for the StudentCart e-commerce platform.

## Files

### 1. products.js

**Complete product catalog with 60 items**

Products are organized into 4 categories:

#### Trendy Outfits (IDs 1-15)

Items: Wireless Earbuds Pro, Denim Jacket, Graphic T-Shirt, Sneakers, Cotton Hoodie, Skinny Jeans, Polo Shirt, Oversized Jacket, Shorts Set, Canvas Sneakers, Crew Neck, Chino Pants, Leather Belt, Baseball Cap, Sweatpants

**Price Range**: ₹299 - ₹1999
**Discount**: 48-50% OFF on all items
**Ratings**: 4.1 - 4.7

#### Essentials (IDs 16-30)

Items: Backpack, Scientific Calculator, Notepads, Gel Pens, Desk Lamp, USB Hub, Phone Stand, Desk Organizer, Highlighters, Filing Cabinet, Sticky Notes, Study Planner, Cable Organizer, Wrist Rest, Document Holder

**Price Range**: ₹149 - ₹1999
**Discount**: 50% OFF on all items
**Ratings**: 4.1 - 4.6

#### Electronics (IDs 31-45)

Items: Bluetooth Speaker, Smart Watch, Power Bank, Fast Cable, USB-C Hub, Wireless Mouse, Mechanical Keyboard, USB Flash Drive, Webcam, Cooling Pad, Screen Protector, Phone Case, Tempered Glass, Power Bank, Wireless Charger

**Price Range**: ₹199 - ₹3999
**Discount**: 50% OFF on all items
**Ratings**: 4.1 - 4.7

#### Mobile Subscriptions (IDs 46-60)

Items: 4G Basic (2GB), 4G Standard (4GB), 4G Premium (6GB), 5G Ultra (10GB), 5G Max (15GB), 4G Video Plan, International Roaming, Student Bundle, Social Media Plan, Family Plan, Campus WiFi, Unlimited Calls, 5G Gaming, Music Bundle, Study Data Plan

**Price Range**: ₹99 - ₹1299
**Discount**: 50% OFF on all items
**Ratings**: 4.2 - 4.7

### Product Object Structure

```javascript
{
  id: 1,
  name: "Product Name",
  category: "Category Name",
  price: 1299,
  originalPrice: 2499,
  discount: "48% OFF",
  rating: 4.5,
  image: "https://unsplash.com/...",
  description: "Product description"
}
```

---

### 2. comboPacks.js

**3 Combo Bundle Packs for Students**

#### Hostel Starter Kit (ID 101) - ₹2499

Includes: Bed sheets (2 sets), Laundry basket, Toiletries set, Desk lamp, Wall hooks, Storage boxes
**Rating**: 4.7
**Best For**: Hostel students moving to new accommodation

#### Exam Essentials Kit (ID 102) - ₹999

Includes: Notebooks (5 pack), Pens (12 count), Scientific calculator, Sticky notes, Highlighters set, Study planner
**Rating**: 4.5
**Best For**: Students preparing for exams

#### Fitness & Health Kit (ID 103) - ₹1499

Includes: Yoga mat, Protein shaker, First aid kit, Healthy snacks pack, Resistance bands, Water bottle
**Rating**: 4.6
**Best For**: Health-conscious students wanting to stay fit

### Combo Pack Object Structure

```javascript
{
  id: 101,
  name: "Kit Name",
  price: 2499,
  originalPrice: 4999,
  discount: "50% OFF",
  rating: 4.7,
  image: "https://unsplash.com/...",
  description: "Kit description",
  items: ["Item 1", "Item 2", ...]
}
```

---

### 3. orders.js

**In-Memory Order Management System**

Provides methods for order operations:

#### Methods Available

- `addOrder(orderData)` - Create new order
- `getAllOrders()` - Retrieve all orders
- `getOrderById(orderId)` - Get specific order
- `updateOrderStatus(orderId, status)` - Update order status
- `deleteOrder(orderId)` - Remove order

#### Order Object Structure

```javascript
{
  orderId: 10001,
  items: [
    {
      id: 1,
      name: "Product Name",
      quantity: 2,
      price: 1299
    }
  ],
  paymentMethod: "credit-card",
  shippingAddress: "123 Street, City, Code",
  totalAmount: 2598,
  userEmail: "user@example.com",
  deliveryDays: "3-5",
  createdAt: "2024-01-15T10:30:00Z",
  status: "Confirmed"
}
```

#### Order Status Values

- "Confirmed" - Order received
- "Processing" - Being prepared
- "Shipped" - On the way
- "Delivered" - Reached customer
- "Cancelled" - Order cancelled

---

## Data Statistics

| Category             | Count        | Total Value |
| -------------------- | ------------ | ----------- |
| Trendy Outfits       | 15 products  | ₹13,485     |
| Essentials           | 15 products  | ₹11,485     |
| Electronics          | 15 products  | ₹15,485     |
| Mobile Subscriptions | 15 products  | ₹5,985      |
| **Combo Packs**      | **3 packs**  | **₹4,997**  |
| **TOTAL**            | **63 items** | **₹51,437** |

---

## Usage in Backend

### Importing Data

```javascript
const products = require("../database/products");
const comboPacks = require("../database/comboPacks");
const orderMethods = require("../database/orders");
```

### Example API Calls

**Get all products**

```javascript
GET / api / products;
```

**Get products by category**

```javascript
GET / api / products / category / Essentials;
```

**Create an order**

```javascript
POST /api/orders
Body: {
  items: [...],
  paymentMethod: "upi",
  totalAmount: 5000,
  userEmail: "student@example.com"
}
```

---

## Future Database Integration

Currently, data is stored in JavaScript files. To scale:

1. **MongoDB** - NoSQL database

   ```bash
   npm install mongodb mongoose
   ```

2. **PostgreSQL** - Relational database

   ```bash
   npm install pg sequelize
   ```

3. **Firebase** - Cloud database
   ```bash
   npm install firebase
   ```

Minimal changes needed - just update data retrieval methods to query database instead of in-memory arrays.

---

## Sample Data Variations

All products include:

- ✅ Realistic pricing (₹99 - ₹3999)
- ✅ Original & discounted prices
- ✅ High-quality Unsplash images
- ✅ 4+ star ratings
- ✅ Descriptive names
- ✅ Category classification
- ✅ Discount percentages

Perfect for testing:

- Product filtering
- Search functionality
- Cart operations
- Payment processing
- Order management

---

## Notes

- All prices are in Indian Rupees (₹)
- Images are from Unsplash (royalty-free)
- All items are relevant to students
- Data is categorized for easy filtering
- No real user data included
- Safe to use for development and testing

---

Last Updated: January 2024
