# StudentCart

![StudentCart Banner](https://images.unsplash.com/photo-1519389953819-39c04fe4ee4e?w=1000&q=80)

StudentCart is a premium, modern e-commerce platform designed explicitly for university students. It provides a seamless shopping experience for student essentials, gadgets, study materials, and mobile data plans.

## 🚀 Key Features

* **Real-Time Web Scraping Integration**: Features a live aggregator that automatically fetches and compares products from external sources (simulated using DummyJSON) to ensure students always get the best deals across the web.
* **Premium Glassmorphism UI**: A completely custom, dark-mode CSS architecture utilizing sleek glassmorphism effects, dynamic tilt-card hover animations, and fluid transitions.
* **Smart Filtering & Search**: Advanced frontend filtering capabilities allowing users to sort by price, category, and minimum ratings instantly.
* **Wishlist Management**: Logged-in users can easily add and remove favorite items to a persistent wishlist.
* **Authentication**: Secure JWT-based registration and login system.
* **Automated Data Seeding**: Automatically populates the database with dozens of curated student products on startup.

## 🛠️ Technology Stack (MERN)

This is a Full-Stack application built using the MERN stack:

* **Frontend**: React.js (v19), Framer Motion, Axios, React Icons
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (In-Memory Database for instant local setup)
* **API/Data**: Custom DummyJSON web scraping fallback architecture

## ⚙️ How to Run Locally

Because this project utilizes an In-Memory MongoDB Server, you do **not** need to install or configure MongoDB locally to evaluate this project. It runs completely out of the box!

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```
> The backend will start on `http://localhost:5000` and automatically seed the database with initial products.

### 2. Start the Frontend Server

Open a **new** terminal window:

```bash
cd frontend
npm install
npm start
```
> The frontend will start on `http://localhost:3001`

### 3. Demo Account
To test the Wishlist and User Profile functionality, you can either sign up for a new account in the UI, or use the pre-seeded demo account:

* **Email**: `student@test.com`
* **Password**: `password123`

---
*Built with ❤️ for students.*
