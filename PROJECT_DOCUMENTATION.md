# HomeTech Spares - Full-Stack Project Documentation

## Project Overview

HomeTech Spares is a complete full-stack e-commerce web application for selling appliance spare parts. The project demonstrates modern web development practices with a hybrid backend architecture.

## Architecture

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Swiper.js (carousels)
- Chart.js (analytics visualization)
- ScrollReveal (animations)
- RemixIcon (icons)

**Backend:**
- **PHP 7.4+** with MySQL - Handles products, orders, and analytics
- **Node.js + Express** with MongoDB - Handles user authentication

**Databases:**
- **MySQL** - Stores products, orders, order_items
- **MongoDB** - Stores user accounts and authentication data

### Why Hybrid Backend?

This project uses two backend technologies:
1. **PHP/MySQL** - Traditional e-commerce operations (products, orders)
2. **Node.js/MongoDB** - Modern authentication system with scalability

This demonstrates ability to work with multiple technologies and integrate them seamlessly.

---

## Admin Dashboard Features (Complete)

### ✅ Dashboard Analytics
Your admin dashboard includes ALL requested features:

1. **Total Revenue** 
   - Displays total sales amount in ₹
   - Calculated from all order_items
   - Real-time updates

2. **Total Users**
   - Shows number of registered users
   - Fetched from MongoDB via Node.js API
   - Excludes admin accounts

3. **Top Selling Products**
   - Bar chart visualization
   - Shows units sold per product
   - Hover to see revenue per product
   - Top 10 products displayed

4. **Total Orders**
   - Count of all customer orders
   - Includes order date tracking

5. **Products Sold**
   - Total units sold across all products
   - Sum of all order quantities

6. **Total Products**
   - Number of products in inventory
   - Products available for sale

7. **Recent Orders (30 days)**
   - Orders placed in last month
   - Helps track recent activity

8. **Sales by Category**
   - Pie chart showing revenue distribution
   - Categories: AC Parts, Refrigerator Parts, etc.
   - Visual breakdown of sales

9. **Customer Purchases Table**
   - Who bought what
   - Customer name, email
   - Product name, quantity, price
   - Purchase date

### ✅ Product Management
Complete CRUD operations:

1. **Add Product**
   - Product name (required)
   - Price (required)
   - Category
   - Image URL or file upload
   - Description
   - Instant database insertion

2. **Edit Product**
   - Modify any product details
   - Pre-filled form with existing data
   - Update in real-time

3. **Delete Product**
   - Remove products from inventory
   - Confirmation dialog
   - Permanent deletion from database

4. **View All Products**
   - Table view with all products
   - ID, Name, Price, Category
   - Action buttons for each product

---

## Project Structure

```
Agboedo-Ecommerce-Website/
│
├── 📄 index.html                    # Homepage with hero slider
├── 📄 products.html                 # Product catalog page
├── 📄 cart.html                     # Shopping cart
├── 📄 checkout.html                 # Checkout form
├── 📄 order-confirmation.html       # Order success page
├── 📄 admin.html                    # Admin dashboard (main)
├── 📄 admin_register.html           # Admin registration
├── 📄 login.html                    # User login
├── 📄 register.html                 # User registration
├── 📄 about.html                    # About us page
├── 📄 contact.html                  # Contact page
├── 📄 service.html                  # Services page
├── 📄 wishlist.html                 # User wishlist
│
├── 🎨 styles.css                    # Main stylesheet
├── 🎨 admin.css                     # Admin dashboard styles
├── 🎨 animations.css                # Animation effects
├── 🎨 modern-ui.css                 # Modern UI components
├── 🎨 product-detail.css            # Product page styles
│
├── 📜 script.js                     # Main JavaScript (cart, wishlist)
├── 📜 admin.js                      # Admin dashboard logic
├── 📜 auth.js                       # Authentication helpers
├── 📜 login.js                      # Login page logic
├── 📜 register.js                   # Registration logic
├── 📜 checkout-handler.js           # Checkout processing
├── 📜 product-data.js               # Product data structure
├── 📜 scroll-animations.js          # Scroll effects
├── 📜 search.js                     # Search functionality
│
├── 📁 assets/                       # Images and media
│   ├── banner.png
│   ├── banner2.png
│   ├── product main.jpg
│   ├── user-1.jpg, user-2.jpg, user-3.jpg
│   └── [product images]
│
├── 📁 product/                      # Individual product pages
│   ├── ac-blower-motor.html
│   ├── ac-capacitor.html
│   └── [70+ product pages]
│
├── 📁 backend/                      # Backend code
│   ├── 📄 db.php                   # MySQL connection & table creation
│   ├── 📄 checkout.php             # Process customer orders
│   ├── 📄 analytics.php            # Dashboard analytics API
│   ├── 📄 manage_products.php      # Product CRUD API
│   ├── 📄 admin_orders.php         # Fetch all orders
│   ├── 📄 add_to_cart.php          # Cart operations
│   ├── 📄 products.php             # Product listing
│   ├── 📄 upload_image.php         # Image upload handler
│   ├── 📄 setup_db.sql             # Database schema + sample data
│   ├── 📄 migrate_products.php     # Data migration script
│   │
│   └── 📁 auth/                    # Node.js authentication server
│       ├── 📄 server.js            # Express server
│       ├── 📄 package.json         # Node dependencies
│       ├── 📄 .env                 # Environment config
│       └── 📁 node_modules/        # Dependencies
│
├── 📄 SETUP_GUIDE.md               # Complete setup instructions
├── 📄 PROJECT_DOCUMENTATION.md     # This file
├── 📄 README.md                    # Project overview
├── 📄 TODO.md                      # Task checklist
├── 📄 start-project.bat            # Quick start script
└── 📄 LICENSE                      # MIT License
```

---

## Data Flow

### Customer Purchase Flow

```
1. Customer browses products (products.html)
   ↓
2. Adds items to cart (localStorage)
   ↓
3. Views cart (cart.html)
   ↓
4. Proceeds to checkout (checkout.html)
   ↓
5. Fills customer details (name, email, phone, address)
   ↓
6. Submits order → POST to backend/checkout.php
   ↓
7. PHP inserts into MySQL:
   - orders table (customer info)
   - order_items table (products purchased)
   ↓
8. Returns success → Redirect to order-confirmation.html
   ↓
9. Cart cleared from localStorage
```

### Admin Dashboard Data Flow

```
1. Admin opens admin.html
   ↓
2. Login form → POST to http://localhost:5001/api/login
   ↓
3. Node.js validates credentials from MongoDB
   ↓
4. Returns user object with role='admin'
   ↓
5. Dashboard loads → GET backend/analytics.php
   ↓
6. PHP queries MySQL for:
   - Total revenue (SUM of order_items.price * quantity)
   - Order count (COUNT of orders)
   - Products sold (SUM of order_items.quantity)
   - Top products (GROUP BY product_name)
   - Sales by category (JOIN with products table)
   ↓
7. PHP queries Node.js API for user count
   ↓
8. Returns JSON with all analytics
   ↓
9. JavaScript renders:
   - Statistics cards
   - Chart.js visualizations
   - Customer purchases table
```

### Product Management Flow

```
Add Product:
1. Click "Add Product" button
2. Fill form (name, price, category, image, description)
3. Submit → POST to backend/manage_products.php
4. PHP inserts into products table
5. Returns success with new product ID
6. Refreshes product list

Edit Product:
1. Click "Edit" button on product
2. Form pre-filled with existing data
3. Modify fields
4. Submit → PUT to backend/manage_products.php
5. PHP updates products table
6. Refreshes product list

Delete Product:
1. Click "Delete" button
2. Confirm dialog
3. DELETE to backend/manage_products.php?id={id}
4. PHP deletes from products table
5. Refreshes product list
```

---

## Database Schema Details

### MySQL Database: `ecommerce`

#### Table: `products`
Stores all product information for the catalog.

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    image VARCHAR(255),
    description TEXT
);
```

**Sample Data:**
- AC Blower Motor - ₹2,300
- AC Capacitor 45/5 µF - ₹380
- Refrigerator Defrost Timer - ₹1,250
- [40+ more products in setup_db.sql]

#### Table: `orders`
Stores customer order information.

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `order_items`
Stores individual items in each order.

```sql
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

**Relationships:**
- One order can have many order_items (1:N)
- order_items.order_id → orders.id

### MongoDB Database: `agboedo`

#### Collection: `users`
Stores user authentication data.

```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (required, plain text - should be hashed in production),
  role: String (default: 'user', can be 'admin'),
  __v: Number
}
```

**Default Admin:**
```javascript
{
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin'
}
```

---

## API Documentation

### Authentication API (Node.js - Port 5001)

#### POST /api/register
Register a new user account.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully."
}
```

**Response (Error):**
```json
{
  "error": "Username or email already exists."
}
```

#### POST /api/login
Authenticate user and return user object.

**Request:**
```json
{
  "email": "admin@admin.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "message": "Login successful.",
  "user": {
    "username": "admin",
    "email": "admin@admin.com",
    "role": "admin"
  }
}
```

#### POST /api/admin_register
Register a new admin account (only if no admin exists).

**Request:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

#### GET /api/admin_exists
Check if an admin account exists.

**Response:**
```json
{
  "exists": true
}
```

#### GET /api/users_count
Get count of registered users (excluding admins).

**Response:**
```json
{
  "count": 25
}
```

### Products API (PHP)

#### GET /backend/manage_products.php
Get all products.

**Response:**
```json
[
  {
    "id": "1",
    "name": "AC Blower Motor",
    "price": "2300.00",
    "category": "AC Parts",
    "image": "https://placehold.co/600x400",
    "description": "High-quality replacement blower motor"
  }
]
```

#### POST /backend/manage_products.php
Add a new product.

**Request:**
```json
{
  "name": "New Product",
  "price": 999.99,
  "category": "AC Parts",
  "image": "https://example.com/image.jpg",
  "description": "Product description"
}
```

#### PUT /backend/manage_products.php
Update existing product.

**Request:**
```json
{
  "id": 1,
  "name": "Updated Product",
  "price": 1299.99,
  "category": "AC Parts",
  "image": "https://example.com/new-image.jpg",
  "description": "Updated description"
}
```

#### DELETE /backend/manage_products.php?id={id}
Delete a product.

**Response:**
```json
{
  "message": "Product deleted"
}
```

### Orders API (PHP)

#### POST /backend/checkout.php
Process customer checkout and create order.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "123 Main St, City, State 12345",
  "items": [
    {
      "name": "AC Blower Motor",
      "price": 2300,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "order_id": 15,
  "message": "Order placed successfully!"
}
```

#### GET /backend/admin_orders.php
Get all orders with items.

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "items": "AC Blower Motor (x2), AC Capacitor (x1)",
    "created_at": "2025-10-05 10:30:00"
  }
]
```

#### GET /backend/analytics.php
Get comprehensive analytics data for admin dashboard.

**Response:**
```json
{
  "total_sales": 125000.50,
  "order_count": 45,
  "total_products": 42,
  "users_count": 28,
  "total_products_sold": 156,
  "recent_orders": 12,
  "sales_by_category": [
    {
      "category": "AC Parts",
      "total_sales": "65000.00"
    }
  ],
  "top_products": [
    {
      "product_name": "AC Blower Motor",
      "total_quantity": "25",
      "total_revenue": "57500.00"
    }
  ],
  "customer_purchases": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "product_name": "AC Blower Motor",
      "quantity": "2",
      "price": "2300.00",
      "created_at": "2025-10-05 10:30:00"
    }
  ]
}
```

---

## Security Considerations

### Current Implementation (Development)
⚠️ This is a **development version** with simplified security:

1. **Passwords**: Stored as plain text in MongoDB
2. **Authentication**: Basic email/password check
3. **Sessions**: Using localStorage (client-side)
4. **CORS**: Permissive (allows all origins)
5. **Input Validation**: Minimal

### Production Requirements
For production deployment, implement:

1. **Password Security**
   - Use bcrypt to hash passwords
   - Never store plain text passwords
   ```javascript
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **Authentication**
   - Implement JWT (JSON Web Tokens)
   - Use httpOnly cookies
   - Add refresh tokens

3. **Input Validation**
   - Sanitize all user inputs
   - Use prepared statements (already done in PHP)
   - Validate on both client and server

4. **CORS Configuration**
   - Restrict to specific domains
   - Remove wildcard (*) origins

5. **HTTPS**
   - Use SSL certificates
   - Redirect HTTP to HTTPS

6. **Rate Limiting**
   - Prevent brute force attacks
   - Limit API requests per IP

7. **SQL Injection Prevention**
   - Already using PDO prepared statements ✅
   - Continue this practice

8. **XSS Prevention**
   - Sanitize HTML output
   - Use Content Security Policy headers

---

## Features Implemented

### ✅ Customer Features
- [x] Product catalog with 70+ products
- [x] Product detail pages
- [x] Shopping cart (localStorage)
- [x] Wishlist functionality
- [x] Checkout process
- [x] Order confirmation
- [x] Responsive design
- [x] Smooth animations
- [x] Image carousels
- [x] Search functionality

### ✅ Admin Features
- [x] Admin authentication
- [x] Dashboard with analytics
- [x] Total revenue display
- [x] User count display
- [x] Top selling products chart
- [x] Sales by category chart
- [x] Customer purchase history
- [x] Product management (CRUD)
- [x] Order management
- [x] Real-time statistics

### ✅ Technical Features
- [x] Hybrid backend (PHP + Node.js)
- [x] MySQL database integration
- [x] MongoDB integration
- [x] RESTful API design
- [x] CORS handling
- [x] Error handling
- [x] Responsive UI
- [x] Chart visualizations
- [x] Auto-create database tables

---

## Future Enhancements

### Recommended Features
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications (order confirmation, shipping)
- [ ] Password reset functionality
- [ ] User profile page
- [ ] Order history for customers
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Inventory management
- [ ] Low stock alerts
- [ ] Multi-image product gallery
- [ ] Product variants (size, color)
- [ ] Coupon/discount codes
- [ ] Shipping calculator
- [ ] Order tracking
- [ ] Export reports (PDF, Excel)
- [ ] Dashboard date range filters
- [ ] Sales forecasting
- [ ] Customer analytics
- [ ] Email marketing integration

---

## Testing Checklist

### Frontend Testing
- [x] Homepage loads correctly
- [x] Navigation works on all pages
- [x] Product catalog displays products
- [x] Add to cart functionality
- [x] Cart updates quantities
- [x] Checkout form validation
- [x] Responsive design on mobile
- [x] Animations work smoothly

### Backend Testing
- [x] MySQL connection successful
- [x] MongoDB connection successful
- [x] Products API returns data
- [x] Orders API creates orders
- [x] Analytics API returns statistics
- [x] User registration works
- [x] User login works
- [x] Admin authentication works

### Admin Dashboard Testing
- [x] Dashboard loads analytics
- [x] Charts render correctly
- [x] Add product works
- [x] Edit product works
- [x] Delete product works
- [x] Orders display correctly
- [x] User count displays
- [x] Revenue calculates correctly

---

## Performance Optimization

### Current Optimizations
- Efficient SQL queries with indexes
- Minimal API calls
- Client-side cart storage (localStorage)
- Lazy loading for images
- Minified CSS/JS (can be added)

### Recommended Optimizations
- Enable gzip compression
- Use CDN for assets
- Implement caching (Redis)
- Optimize images (WebP format)
- Database query optimization
- Implement pagination for large datasets
- Use connection pooling

---

## Deployment Guide

### Local Development
Already set up! Use `start-project.bat`

### Shared Hosting (PHP)
1. Upload files via FTP
2. Import database via cPanel
3. Update db.php with hosting credentials
4. Deploy Node.js to separate service (Heroku, Railway)
5. Update API URLs in frontend

### VPS/Cloud (Full Control)
1. Install LAMP stack (Linux, Apache, MySQL, PHP)
2. Install Node.js and MongoDB
3. Configure Apache virtual host
4. Set up SSL certificate (Let's Encrypt)
5. Configure firewall
6. Set up process manager (PM2 for Node.js)

### MongoDB Atlas (Cloud Database)
1. Create free cluster at mongodb.com
2. Get connection string
3. Update .env file
4. Whitelist IP addresses

---

## Troubleshooting Guide

See `SETUP_GUIDE.md` for detailed troubleshooting steps.

---

## Credits

**Developer**: HomeTech Spares Team  
**GitHub**: https://github.com/HilaryOkonkwo  
**License**: MIT  

**Technologies Used:**
- Chart.js - https://www.chartjs.org/
- Swiper.js - https://swiperjs.com/
- RemixIcon - https://remixicon.com/
- ScrollReveal - https://scrollrevealjs.org/
- Express.js - https://expressjs.com/
- Mongoose - https://mongoosejs.com/

---

## Version History

**v1.0.0** (October 2025)
- Initial release
- Complete e-commerce functionality
- Admin dashboard with analytics
- Product management
- Order processing
- User authentication

---

## License

MIT License - See LICENSE file for details

---

**Project Status**: ✅ Production Ready (with security enhancements needed)

**Last Updated**: October 5, 2025
