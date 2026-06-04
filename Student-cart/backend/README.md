# StudentCart Backend API

Backend API server for StudentCart e-commerce platform built with Node.js and Express.

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Development

```bash
npm install -g nodemon  # if not already installed
npm run dev
```

### Production

```bash
npm start
```

Server will run on `http://localhost:5000` (or port specified in .env)

## API Endpoints

### Health Check

- **GET** `/api/health` - Check server status

### Products

#### Get All Products

- **GET** `/api/products`
- Returns all 60 products with filters available

#### Get Product by ID

- **GET** `/api/products/:id`
- Returns single product details

#### Get Products by Category

- **GET** `/api/products/category/:category`
- Categories: "Trendy Outfits", "Essentials", "Electronics", "Mobile Subscriptions"

#### Get All Categories

- **GET** `/api/categories`
- Returns list of all available categories

#### Search Products

- **GET** `/api/search?q=query`
- Searches across product name, description, and category

#### Filter by Price

- **GET** `/api/products/filter/price?min=100&max=5000`
- Filter products within price range

#### Filter by Rating

- **GET** `/api/products/filter/rating?min=4.0`
- Filter products by minimum rating

### Combo Packs

#### Get All Combo Packs

- **GET** `/api/combo-packs`
- Returns all 3 combo packs

#### Get Combo Pack by ID

- **GET** `/api/combo-packs/:id`
- Returns single combo pack details

### Orders

#### Create New Order

- **POST** `/api/orders`
- **Request Body:**
  ```json
  {
    "items": [
      {
        "id": 1,
        "name": "Product Name",
        "quantity": 2,
        "price": 1299
      }
    ],
    "paymentMethod": "credit-card|upi|net-banking|google-pay|paypal|cod",
    "shippingAddress": "123 Street, City, Postal Code",
    "totalAmount": 2598,
    "userEmail": "user@example.com"
  }
  ```

#### Get All Orders

- **GET** `/api/orders`
- Returns all orders in the system

#### Get Order by ID

- **GET** `/api/orders/:orderId`
- Returns specific order details

#### Get User Orders

- **GET** `/api/orders/user/:email`
- Returns all orders for a specific user

#### Update Order Status

- **PUT** `/api/orders/:orderId/status`
- **Request Body:**
  ```json
  {
    "status": "Confirmed|Processing|Shipped|Delivered|Cancelled"
  }
  ```

### Payment

#### Validate Payment

- **POST** `/api/validate-payment`
- **Request Body:**
  ```json
  {
    "paymentMethod": "credit-card",
    "cardDetails": {
      "number": "1234567890123456",
      "expiry": "12/25",
      "cvv": "123"
    }
  }
  ```
- For UPI: Replace cardDetails with `"upiId": "user@bank"`

### Statistics

#### Get Store Statistics

- **GET** `/api/stats`
- Returns overall store metrics

## Database Structure

### Products (60 total)

- **Trendy Outfits** (15): Wireless earbuds, jackets, t-shirts, sneakers, etc.
- **Essentials** (15): Backpack, calculator, notepads, pens, desk lamp, etc.
- **Electronics** (15): Speaker, smartwatch, charger, mouse, keyboard, etc.
- **Mobile Subscriptions** (15): 4G/5G plans with various data limits

### Combo Packs (3 total)

1. **Hostel Starter Kit** - ₹2499
2. **Exam Essentials Kit** - ₹999
3. **Fitness & Health Kit** - ₹1499

### Orders

- Stored in memory (can be replaced with MongoDB/PostgreSQL)
- Contains order ID, items, payment method, shipping address, and status

## Response Format

All endpoints return JSON in this format:

**Success:**

```json
{
  "success": true,
  "message": "Optional message",
  "data": {},
  "count": 60
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## Environment Variables

Create `.env` file with:

```
PORT=5000
NODE_ENV=development
```

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Development Dependencies

- **nodemon** - Auto-restart server on changes

## Data Sets

### Products Dataset

- **File**: `database/products.js`
- 60 products across 4 categories
- Each product includes: id, name, category, price, originalPrice, discount, rating, image URL, description

### Combo Packs Dataset

- **File**: `database/comboPacks.js`
- 3 bundle packs with included items
- Perfect for students starting hostel or preparing for exams

### Orders Dataset

- **File**: `database/orders.js`
- In-memory order storage with CRUD operations
- Easy to migrate to a real database later

## CORS Configuration

The server allows requests from any origin. Modify in `server.js` for production:

```javascript
const corsOptions = {
  origin: "https://yourdomain.com",
  credentials: true,
};
app.use(cors(corsOptions));
```

## Future Enhancements

- [ ] Connect to MongoDB for persistent storage
- [ ] Add user authentication (JWT)
- [ ] Integrate with payment gateway (Razorpay, PayPal)
- [ ] Add email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Inventory management
- [ ] Admin dashboard API

## License

MIT

## Support

For API issues or feature requests, contact the development team.
