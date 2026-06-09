// Explicitly defined products with 1-to-1 exact realistic Unsplash image matching

const products = [
  // --- TRENDY OUTFITS ---
  {
    id: 1, name: "Oversized College Hoodie", category: "Trendy Outfits",
    price: 799, originalPrice: 1499, discount: "46% OFF", rating: 4.8,
    image: "/uploads/hoodie_1781030815230.png",
    description: "Perfect for early morning lectures. Insanely comfortable."
  },
  {
    id: 2, name: "Vintage Denim Jacket", category: "Trendy Outfits",
    price: 899, originalPrice: 1999, discount: "55% OFF", rating: 2.5,
    image: "/uploads/denim_jacket_1781030829143.png",
    description: "Classic blue denim jacket. A campus wardrobe essential."
  },
  {
    id: 3, name: "Casual Cotton Kurti", category: "Trendy Outfits",
    price: 499, originalPrice: 999, discount: "50% OFF", rating: 3.7,
    image: "/uploads/kurti_1781030848414.png",
    description: "Breathable cotton kurti, ideal for everyday college wear."
  },
  {
    id: 4, name: "Classic Campus Polo", category: "Trendy Outfits",
    price: 399, originalPrice: 799, discount: "50% OFF", rating: 4.3,
    image: "/uploads/polo_1781030881147.png",
    description: "Smart casual polo t-shirt for presentations and daily classes."
  },
  {
    id: 5, name: "Cargo Utility Joggers", category: "Trendy Outfits",
    price: 699, originalPrice: 1299, discount: "46% OFF", rating: 4.6,
    image: "/uploads/joggers_1781030892552.png",
    description: "Trendy cargo pants with multiple utility pockets."
  },
  {
    id: 6, name: "Classic Canvas Sneakers", category: "Trendy Outfits",
    price: 999, originalPrice: 1999, discount: "50% OFF", rating: 4.9,
    image: "/uploads/sneakers_1781030904972.png",
    description: "Durable everyday sneakers that match any outfit."
  },
  {
    id: 7, name: "Ethnic College Wear Set", category: "Trendy Outfits",
    price: 899, originalPrice: 1599, discount: "43% OFF", rating: 4.8,
    image: "/uploads/ethnic_set_1781030862386.png",
    description: "Beautiful ethnic set perfect for campus festivals and events."
  },
  {
    id: 8, name: "Oversized Graphic T-shirt", category: "Trendy Outfits",
    price: 399, originalPrice: 699, discount: "42% OFF", rating: 4.4,
    image: "/uploads/graphic_tee_1781030917975.png",
    description: "Trendy oversized tee with high-quality graphic print."
  },

  // --- ESSENTIALS ---
  {
    id: 101, name: "College Laptop Backpack", category: "Essentials",
    price: 599, originalPrice: 1499, discount: "60% OFF", rating: 4.8,
    image: "/uploads/backpack_1781030936426.png",
    description: "Spacious water-resistant backpack with laptop compartment."
  },
  {
    id: 102, name: "Spiral Notebook Combo", category: "Essentials",
    price: 199, originalPrice: 399, discount: "50% OFF", rating: 4.7,
    image: "/uploads/notebooks_1781030948448.png",
    description: "Pack of 5 high-quality A4 spiral notebooks for all your subjects."
  },
  {
    id: 103, name: "Insulated Water Bottle", category: "Essentials",
    price: 149, originalPrice: 499, discount: "70% OFF", rating: 4.6,
    image: "/uploads/water_bottle_1781030962532.png",
    description: "Keeps water cold for 24 hours. A dorm and campus essential."
  },
  {
    id: 104, name: "LED Study Lamp", category: "Essentials",
    price: 499, originalPrice: 999, discount: "50% OFF", rating: 4.5,
    image: "/uploads/study_lamp_1781030981999.png",
    description: "Adjustable desk lamp with eye-protection for late-night study sessions."
  },
  {
    id: 105, name: "Premium Gel Pens Set", category: "Essentials",
    price: 99, originalPrice: 199, discount: "50% OFF", rating: 4.8,
    image: "/uploads/gel_pens_1781031000984.png",
    description: "Smooth writing gel pens. Pack of 10."
  },
  {
    id: 106, name: "Engineering Mathematics Textbook", category: "Essentials",
    price: 650, originalPrice: 1200, discount: "45% OFF", rating: 3.2,
    image: "/uploads/engineering_book_1781031012613.png",
    description: "Standard reference book for 1st-year engineering students."
  },
  {
    id: 107, name: "Classic Novels Collection", category: "Essentials",
    price: 399, originalPrice: 799, discount: "50% OFF", rating: 4.9,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800",
    description: "Set of 3 must-read classic novels for leisure reading."
  },

  // --- ELECTRONICS ---
  {
    id: 201, name: "Pro Wireless Earbuds", category: "Electronics",
    price: 699, originalPrice: 1999, discount: "65% OFF", rating: 4.6,
    image: "/uploads/earbuds_1781031024319.png",
    description: "Block out dorm noise with these high-quality wireless earbuds."
  },
  {
    id: 202, name: "RGB Mechanical Keyboard", category: "Electronics",
    price: 499, originalPrice: 1299, discount: "61% OFF", rating: 4.5,
    image: "/uploads/keyboard_1781031037742.png",
    description: "Clicky, responsive keyboard perfect for typing long essays or casual gaming."
  },
  {
    id: 203, name: "Ergonomic Wireless Mouse", category: "Electronics",
    price: 299, originalPrice: 799, discount: "62% OFF", rating: 2.8,
    image: "/uploads/mouse_1781031057626.png",
    description: "Comfortable grip mouse for long hours of research and study."
  },
  {
    id: 204, name: "Over-Ear Studio Headphones", category: "Electronics",
    price: 899, originalPrice: 2499, discount: "64% OFF", rating: 4.7,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800",
    description: "Immersive sound quality for your study playlists."
  },
  {
    id: 205, name: "Power Bank 20000mAh", category: "Electronics",
    price: 799, originalPrice: 1599, discount: "50% OFF", rating: 4.8,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800",
    description: "Never let your phone or devices die during a long day on campus."
  },

  // --- MOBILE SUBSCRIPTIONS ---
  {
    id: 301, name: "Student 5G Plan (2GB/Day)", category: "Mobile Subscriptions",
    price: 199, originalPrice: 399, discount: "50% OFF", rating: 4.5,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
    description: "High-speed mobile data for online classes and streaming."
  },
  {
    id: 302, name: "Music Premium Student Plan", category: "Mobile Subscriptions",
    price: 99, originalPrice: 199, discount: "50% OFF", rating: 4.9,
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800",
    description: "Because every study session needs ad-free music."
  },

  // --- COMBO PACKS ---
  {
    id: 401, name: "Semester Stationery Bundle", category: "Combo Packs",
    price: 899, originalPrice: 1599, discount: "43% OFF", rating: 4.8,
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800",
    description: "Complete set: 10 Notebooks, Pens, Highlighters, and Sticky Notes."
  },
  {
    id: 402, name: "Student Tech Starter Kit", category: "Combo Packs",
    price: 1299, originalPrice: 2499, discount: "48% OFF", rating: 4.7,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
    description: "Includes a wireless mouse, mechanical keyboard, and a large desk pad."
  },
  {
    id: 403, name: "Hostel Room Essentials Box", category: "Combo Packs",
    price: 1999, originalPrice: 3999, discount: "50% OFF", rating: 4.9,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800",
    description: "2 Premium bedsheets, pillow covers, and 3 soft bath towels."
  },
  {
    id: 404, name: "Freshman Wardrobe Combo", category: "Combo Packs",
    price: 1499, originalPrice: 2999, discount: "50% OFF", rating: 4.8,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
    description: "Pack of 3 solid color casual t-shirts and 1 pair of everyday jeans."
  }
];

module.exports = products;
