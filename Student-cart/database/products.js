// Real-World Branded Products Dataset
const products = [
  // Trendy Outfits (15 items)
  {
    id: 1, name: "Nike Air Force 1 '07", category: "Trendy Outfits", price: 7495, originalPrice: 9495, discount: "21% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/51w+z4q4mVL._AC_SY500_.jpg", description: "Classic white Nike Air Force 1 sneakers. Timeless style for campus life."
  },
  {
    id: 2, name: "Levi's Men's Trucker Denim Jacket", category: "Trendy Outfits", price: 3199, originalPrice: 4599, discount: "30% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81xUjBnt5VL._AC_SY741_.jpg", description: "Iconic Levi's trucker jacket. Perfect layering for chilly morning classes."
  },
  {
    id: 3, name: "Adidas Originals Trefoil Hoodie", category: "Trendy Outfits", price: 4599, originalPrice: 5999, discount: "23% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/71Y+z4q4mVL._AC_SY741_.jpg", description: "Comfortable and stylish Adidas pullover hoodie." // Fallback image style
  },
  {
    id: 4, name: "Puma Suede Classic XXI Sneakers", category: "Trendy Outfits", price: 4999, originalPrice: 6999, discount: "28% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71S+z4q4mVL._AC_SY695_.jpg", description: "Vintage Puma Suede sneakers for a retro campus look."
  },
  {
    id: 5, name: "Zara Men's Faux Leather Biker Jacket", category: "Trendy Outfits", price: 5990, originalPrice: 7990, discount: "25% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71W+z4q4mVL._AC_SY741_.jpg", description: "Premium faux leather jacket for night outs."
  },
  {
    id: 6, name: "H&M Relaxed Fit Cargo Pants", category: "Trendy Outfits", price: 2299, originalPrice: 2999, discount: "23% OFF", rating: 4.3,
    image: "https://m.media-amazon.com/images/I/61X+z4q4mVL._AC_SY741_.jpg", description: "Trendy relaxed fit cargo pants with utility pockets."
  },
  {
    id: 7, name: "Tommy Hilfiger Classic Polo", category: "Trendy Outfits", price: 2999, originalPrice: 4999, discount: "40% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81T+z4q4mVL._AC_SY741_.jpg", description: "Smart casual polo shirt for presentations and events."
  },
  {
    id: 8, name: "Vans Old Skool Canvas Sneakers", category: "Trendy Outfits", price: 3999, originalPrice: 4999, discount: "20% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/71P+z4q4mVL._AC_SY695_.jpg", description: "The classic Vans skate shoe, a staple for every student."
  },
  {
    id: 9, name: "Calvin Klein Logo T-Shirt", category: "Trendy Outfits", price: 1999, originalPrice: 2999, discount: "33% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71L+z4q4mVL._AC_SY741_.jpg", description: "Minimalist cotton t-shirt with classic CK logo."
  },
  {
    id: 10, name: "Nike Pro Dri-FIT Tights", category: "Trendy Outfits", price: 2495, originalPrice: 3295, discount: "24% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/61N+z4q4mVL._AC_SY741_.jpg", description: "Breathable compression tights for university gym sessions."
  },
  {
    id: 11, name: "Converse Chuck Taylor All Star", category: "Trendy Outfits", price: 2999, originalPrice: 3999, discount: "25% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81C+z4q4mVL._AC_SY695_.jpg", description: "High-top Chuck Taylors in classic black."
  },
  {
    id: 12, name: "Ray-Ban Aviator Classic Sunglasses", category: "Trendy Outfits", price: 8990, originalPrice: 10590, discount: "15% OFF", rating: 4.9,
    image: "https://m.media-amazon.com/images/I/51R+z4q4mVL._AC_SY355_.jpg", description: "Authentic Ray-Ban aviators to protect your eyes on campus."
  },
  {
    id: 13, name: "Under Armour Hustle Sport Backpack", category: "Trendy Outfits", price: 2999, originalPrice: 4599, discount: "34% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81U+z4q4mVL._AC_SY695_.jpg", description: "Sporty and water-resistant backpack for student athletes."
  },
  {
    id: 14, name: "Gap Vintage Soft Hoodie", category: "Trendy Outfits", price: 2599, originalPrice: 3999, discount: "35% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71G+z4q4mVL._AC_SY741_.jpg", description: "Extremely soft vintage wash hoodie for study sessions."
  },
  {
    id: 15, name: "Fossil Minimalist Leather Watch", category: "Trendy Outfits", price: 5495, originalPrice: 8995, discount: "38% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/71F+z4q4mVL._AC_SY695_.jpg", description: "Elegant brown leather watch perfect for interviews."
  },

  // Essentials (15 items)
  {
    id: 16, name: "Wildcraft 44L Laptop Backpack", category: "Essentials", price: 1549, originalPrice: 2999, discount: "48% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/81x2LwYedpL._SX679_.jpg", description: "Durable water-resistant backpack with 15.6-inch laptop compartment."
  },
  {
    id: 17, name: "Casio FX-991EX Scientific Calculator", category: "Essentials", price: 1299, originalPrice: 1599, discount: "18% OFF", rating: 4.9,
    image: "https://m.media-amazon.com/images/I/61lXGzSjVJL._SX679_.jpg", description: "Engineering student's best friend. Non-programmable scientific calculator."
  },
  {
    id: 18, name: "Classmate Pulse Spiral Notebook (Pack of 6)", category: "Essentials", price: 450, originalPrice: 540, discount: "16% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71H2GkG40dL._SX679_.jpg", description: "A4 size spiral bound notebooks with 300 pages each."
  },
  {
    id: 19, name: "Parker Vector Matte Black Roller Ball Pen", category: "Essentials", price: 350, originalPrice: 450, discount: "22% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/61BwUe3qX1L._SX679_.jpg", description: "Premium roller ball pen for smooth and elegant writing."
  },
  {
    id: 20, name: "Milton Thermosteel 24 Hours Hot/Cold Flask", category: "Essentials", price: 999, originalPrice: 1450, discount: "31% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/61kM5jG-M-L._SX679_.jpg", description: "1000ml vacuum insulated steel flask for library sessions."
  },
  {
    id: 21, name: "IKEA FORSA Desk Work Lamp", category: "Essentials", price: 1490, originalPrice: 1990, discount: "25% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/61Xz9nJ3tFL._SX679_.jpg", description: "Adjustable desk lamp ideal for late-night studying."
  },
  {
    id: 22, name: "Post-it Notes Original (Pack of 12)", category: "Essentials", price: 499, originalPrice: 799, discount: "37% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71LqH0qYJkL._SX679_.jpg", description: "3x3 inch sticky notes in neon colors for quick reminders."
  },
  {
    id: 23, name: "Logitech B170 Wireless Mouse", category: "Essentials", price: 599, originalPrice: 895, discount: "33% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/516LU0H9qiL._SX679_.jpg", description: "Reliable 2.4GHz wireless mouse with 1-year battery life."
  },
  {
    id: 24, name: "Faber-Castell Textliner Highlighters", category: "Essentials", price: 100, originalPrice: 150, discount: "33% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71p0WfB6LKL._SX679_.jpg", description: "Pack of 5 fluorescent highlighters for textbook marking."
  },
  {
    id: 25, name: "SanDisk Ultra 64GB USB 3.0 Flash Drive", category: "Essentials", price: 449, originalPrice: 1050, discount: "57% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/61UxbnxZVLL._SX679_.jpg", description: "Fast USB 3.0 storage for transferring projects and assignments."
  },
  {
    id: 26, name: "Amazon Basics Laptop Sleeve 15.6 Inch", category: "Essentials", price: 499, originalPrice: 999, discount: "50% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81I3yYwDIfL._SX679_.jpg", description: "Protective neoprene sleeve to keep your laptop scratch-free."
  },
  {
    id: 27, name: "Cello Maxriter Ball Pen (Pack of 10)", category: "Essentials", price: 90, originalPrice: 100, discount: "10% OFF", rating: 4.3,
    image: "https://m.media-amazon.com/images/I/61Nl-HhC7FL._SX679_.jpg", description: "Smooth writing ball pens designed for exam marathons."
  },
  {
    id: 28, name: "Seagate One Touch 1TB External HDD", category: "Essentials", price: 4499, originalPrice: 6599, discount: "31% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/713vEqg-k1L._SX679_.jpg", description: "Portable 1TB hard drive to backup all your university work."
  },
  {
    id: 29, name: "Portronics Portable Laptop Stand", category: "Essentials", price: 399, originalPrice: 999, discount: "60% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/618x+O-zTzL._SX679_.jpg", description: "Ergonomic foldable laptop stand for better posture."
  },
  {
    id: 30, name: "Noise ColorFit Pro 4 Smartwatch", category: "Essentials", price: 2999, originalPrice: 5999, discount: "50% OFF", rating: 4.2,
    image: "https://m.media-amazon.com/images/I/61vfoTOdSLL._SX679_.jpg", description: "Track your steps around campus and get notification alerts."
  },

  // Electronics (15 items)
  {
    id: 31, name: "Apple iPhone 15 Pro Max (256 GB)", category: "Electronics", price: 148900, originalPrice: 159900, discount: "6% OFF", rating: 4.9,
    image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg", description: "A17 Pro chip, Titanium design, and a stunning 48MP camera system."
  },
  {
    id: 32, name: "Apple MacBook Air M2 13.6-inch", category: "Electronics", price: 104990, originalPrice: 114900, discount: "8% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJ4L._SX679_.jpg", description: "The perfect student laptop. Ultra-thin, 18hr battery, M2 power."
  },
  {
    id: 33, name: "Sony WH-1000XM5 Wireless Headphones", category: "Electronics", price: 29990, originalPrice: 34990, discount: "14% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/51aXvjzcukL._SX679_.jpg", description: "Industry-leading noise cancellation to block out dorm noise."
  },
  {
    id: 34, name: "Samsung Galaxy S24 Ultra 5G", category: "Electronics", price: 129999, originalPrice: 134999, discount: "3% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71CXhVvdvLL._SX679_.jpg", description: "Galaxy AI is here. The ultimate Android flagship with S-Pen."
  },
  {
    id: 35, name: "ASUS TUF Gaming F15 Laptop", category: "Electronics", price: 54990, originalPrice: 74990, discount: "26% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81PjTigW3wL._SX679_.jpg", description: "Intel Core i5, RTX 2050, 144Hz display for gaming between classes."
  },
  {
    id: 36, name: "Apple iPad Air (5th Generation)", category: "Electronics", price: 54900, originalPrice: 59900, discount: "8% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/61XZQXFQeVL._SX679_.jpg", description: "M1 chip. Perfect for taking digital notes in lectures."
  },
  {
    id: 37, name: "boAt Airdopes 141 Bluetooth TWS", category: "Electronics", price: 1299, originalPrice: 4490, discount: "71% OFF", rating: 4.1,
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX679_.jpg", description: "Budget-friendly true wireless earbuds with 42H playtime."
  },
  {
    id: 38, name: "OnePlus Nord CE 3 Lite 5G", category: "Electronics", price: 19999, originalPrice: 19999, discount: "0% OFF", rating: 4.3,
    image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg", description: "Excellent mid-range student smartphone with 108MP camera."
  },
  {
    id: 39, name: "Logitech MX Master 3S Wireless Mouse", category: "Electronics", price: 8995, originalPrice: 10995, discount: "18% OFF", rating: 4.7,
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg", description: "The ultimate productivity mouse for designers and coders."
  },
  {
    id: 40, name: "MI Power Bank 3i 20000mAh", category: "Electronics", price: 2149, originalPrice: 2199, discount: "2% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/71lVwl3q-kL._SX679_.jpg", description: "Massive battery backup to keep your devices charged all day."
  },
  {
    id: 41, name: "JBL Flip 6 Wireless Portable Speaker", category: "Electronics", price: 9999, originalPrice: 13999, discount: "28% OFF", rating: 4.6,
    image: "https://m.media-amazon.com/images/I/61aK0bM8YwL._SX679_.jpg", description: "Waterproof, dustproof, and loud sound for dorm parties."
  },
  {
    id: 42, name: "Kindle Paperwhite (16 GB)", category: "Electronics", price: 14999, originalPrice: 14999, discount: "0% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/711q-olA+kL._SX679_.jpg", description: "Read all your assigned literature without eye strain."
  },
  {
    id: 43, name: "Dell G15 5520 Gaming Laptop", category: "Electronics", price: 74990, originalPrice: 96153, discount: "22% OFF", rating: 4.4,
    image: "https://m.media-amazon.com/images/I/61I2o86l5qL._SX679_.jpg", description: "Intel i5-12500H, 16GB DDR5, RTX 3050 graphics."
  },
  {
    id: 44, name: "GoPro HERO12 Black Action Camera", category: "Electronics", price: 37990, originalPrice: 45000, discount: "15% OFF", rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61v+H5eQ+lL._SX679_.jpg", description: "Capture your college trips and sports in stunning 5.3K."
  },
  {
    id: 45, name: "Apple AirPods Pro (2nd Generation)", category: "Electronics", price: 24900, originalPrice: 24900, discount: "0% OFF", rating: 4.8,
    image: "https://m.media-amazon.com/images/I/61f1IQIfO3L._SX679_.jpg", description: "Seamless integration with your Apple devices."
  },

  // Mobile Subscriptions (15 items)
  {
    id: 46, name: "Jio ₹299 Monthly Plan (2GB/Day)", category: "Mobile Subscriptions", price: 299, originalPrice: 349, discount: "14% OFF", rating: 4.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/512px-Reliance_Jio_Logo_%28October_2015%29.svg.png", description: "28 Days Validity. 2GB High-Speed 5G Data per day. Unlimited Calls."
  },
  {
    id: 47, name: "Airtel ₹359 Monthly Pack (2.5GB/Day)", category: "Mobile Subscriptions", price: 359, originalPrice: 399, discount: "10% OFF", rating: 4.6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Airtel_logo.svg/512px-Airtel_logo.svg.png", description: "28 Days. Includes Amazon Prime Video Mobile Edition."
  },
  {
    id: 48, name: "Vi (Vodafone Idea) ₹479 Hero Unlimited", category: "Mobile Subscriptions", price: 479, originalPrice: 549, discount: "12% OFF", rating: 4.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vi_logo.svg/512px-Vi_logo.svg.png", description: "56 Days Validity. 1.5GB/Day with Binge All Night free data."
  },
  {
    id: 49, name: "Jio ₹749 Quarterly Plan (2GB/Day)", category: "Mobile Subscriptions", price: 749, originalPrice: 899, discount: "16% OFF", rating: 4.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/512px-Reliance_Jio_Logo_%28October_2015%29.svg.png", description: "90 Days Validity. 2GB/Day. Best value for university students."
  },
  {
    id: 50, name: "Airtel ₹839 Disney+ Hotstar Plan", category: "Mobile Subscriptions", price: 839, originalPrice: 999, discount: "16% OFF", rating: 4.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Airtel_logo.svg/512px-Airtel_logo.svg.png", description: "84 Days. 2GB/Day. Includes 3-month Disney+ Hotstar subscription."
  },
  {
    id: 51, name: "BSNL ₹199 Monthly Voucher", category: "Mobile Subscriptions", price: 199, originalPrice: 249, discount: "20% OFF", rating: 3.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/BSNL_logo.svg/512px-BSNL_logo.svg.png", description: "30 Days Validity. 2GB/Day. Ultra budget-friendly plan."
  },
  {
    id: 52, name: "Jio ₹2999 Annual Plan (2.5GB/Day)", category: "Mobile Subscriptions", price: 2999, originalPrice: 3599, discount: "16% OFF", rating: 4.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/512px-Reliance_Jio_Logo_%28October_2015%29.svg.png", description: "365 Days Validity. Uninterrupted connectivity for the whole year."
  },
  {
    id: 53, name: "Vi ₹901 OTT Combo (3GB/Day)", category: "Mobile Subscriptions", price: 901, originalPrice: 1199, discount: "24% OFF", rating: 4.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vi_logo.svg/512px-Vi_logo.svg.png", description: "70 Days Validity. Includes SonyLIV Premium for weekend entertainment."
  },
  {
    id: 54, name: "Airtel ₹149 Data Add-on (15GB)", category: "Mobile Subscriptions", price: 149, originalPrice: 199, discount: "25% OFF", rating: 4.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Airtel_logo.svg/512px-Airtel_logo.svg.png", description: "Emergency data booster pack. 15GB data valid until current plan expires."
  },
  {
    id: 55, name: "Jio ₹15 Data Booster (1GB)", category: "Mobile Subscriptions", price: 15, originalPrice: 25, discount: "40% OFF", rating: 4.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/512px-Reliance_Jio_Logo_%28October_2015%29.svg.png", description: "Ran out of data during an assignment? Instant 1GB top-up."
  },
  {
    id: 56, name: "JioFi Portable Hotspot Router", category: "Mobile Subscriptions", price: 1999, originalPrice: 2499, discount: "20% OFF", rating: 4.3,
    image: "https://m.media-amazon.com/images/I/41OQIf2D7vL._SX679_.jpg", description: "Connect up to 10 devices. Perfect for dorm room wifi sharing."
  },
  {
    id: 57, name: "Airtel Xstream Fiber Basic (40 Mbps)", category: "Mobile Subscriptions", price: 499, originalPrice: 699, discount: "28% OFF", rating: 4.6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Airtel_logo.svg/512px-Airtel_logo.svg.png", description: "Monthly Broadband connection. Unlimited data for online classes."
  },
  {
    id: 58, name: "JioFiber ₹999 Plan (150 Mbps)", category: "Mobile Subscriptions", price: 999, originalPrice: 1299, discount: "23% OFF", rating: 4.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/512px-Reliance_Jio_Logo_%28October_2015%29.svg.png", description: "High-speed broadband with free OTT apps for student apartments."
  },
  {
    id: 59, name: "Vi ₹151 Work From Home Pack (8GB)", category: "Mobile Subscriptions", price: 151, originalPrice: 199, discount: "24% OFF", rating: 4.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vi_logo.svg/512px-Vi_logo.svg.png", description: "30 Days Validity. Dedicated extra data for Microsoft Teams & Zoom."
  },
  {
    id: 60, name: "Airtel ₹299 Postpaid Family Plan", category: "Mobile Subscriptions", price: 299, originalPrice: 399, discount: "25% OFF", rating: 4.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Airtel_logo.svg/512px-Airtel_logo.svg.png", description: "Student-friendly postpaid plan with 30GB rollover data."
  }
];

module.exports = products;
