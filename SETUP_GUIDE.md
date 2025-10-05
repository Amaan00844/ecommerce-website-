# HomeTech Spares - Complete Setup Guide

## Admin Dashboard Features

Your admin dashboard includes all the features you requested:

### 📊 Dashboard Overview
1. **Total Revenue** - Shows total sales amount in ₹
2. **Total Users** - Number of registered users from MongoDB
3. **Top Selling Products** - Bar chart showing best-selling items
4. **Total Orders** - Count of all customer orders
5. **Products Sold** - Total units sold across all products
6. **Total Products** - Number of products in inventory
7. **Recent Orders** - Orders from last 30 days
8. **Sales by Category** - Pie chart showing revenue distribution
9. **Customer Purchases Table** - Who bought what, when

### 🛠️ Product Management
- **Add Product** - Create new products with name, price, category, image, description
- **Edit Product** - Modify existing product details
- **Delete Product** - Remove products from inventory
- **View All Products** - Table view of entire inventory

---

## Quick Start Guide

### Prerequisites
- **XAMPP** (Apache + MySQL + PHP)
- **Node.js** v14+ and npm
- **MongoDB** (local or MongoDB Atlas)

### Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** (for PHP backend)
3. Start **MySQL** (for database)

### Step 2: Setup MySQL Database
1. Open browser: http://localhost/phpmyadmin
2. Click "New" to create database
3. Database name: `ecommerce`
4. Click "Create"
5. Select `ecommerce` database
6. Go to "Import" tab
7. Choose file: `backend/setup_db.sql`
8. Click "Go" to import

**Or use command line:**
```bash
mysql -u root -p
CREATE DATABASE ecommerce;
USE ecommerce;
SOURCE backend/setup_db.sql;
```

### Step 3: Setup MongoDB & Node.js Server

#### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   mongod
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Install Node.js Dependencies
```bash
cd backend/auth
npm install
```

#### Configure Environment
Edit `backend/auth/.env`:
```env
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/agboedo

# For MongoDB Atlas:
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/agboedo

PORT=5001
```

#### Start Auth Server
```bash
npm start
```

You should see:
```
Server running on port 5001
MongoDB connected
Default admin user created: email: admin@admin.com, password: admin123
```

### Step 4: Move Project to XAMPP
1. Copy entire project folder to: `C:\xampp\htdocs\`
2. Rename folder to: `Agboedo-Ecommerce-Website`

### Step 5: Access the Website
Open browser and go to:
- **Homepage**: http://localhost/Agboedo-Ecommerce-Website/index.html
- **Admin Dashboard**: http://localhost/Agboedo-Ecommerce-Website/admin.html

---

## Admin Dashboard Access

### Default Admin Credentials
- **Email**: admin@admin.com
- **Password**: admin123

⚠️ **Important**: Change these credentials after first login!

### Admin Features Guide

#### 1. View Dashboard Analytics
- Click "Dashboard" button
- See all metrics: revenue, users, orders, products
- View charts for sales by category and top products
- Check customer purchase history

#### 2. Add New Product
- Click "Manage Products" button
- Click "Add Product" button
- Fill in details:
  - Product Name (required)
  - Price (required)
  - Category (e.g., "AC Parts", "Refrigerator Parts")
  - Image URL or upload image
  - Description
- Click "Save"

#### 3. Edit Product
- Go to "Manage Products"
- Click "Edit" button on any product
- Modify details
- Click "Save"

#### 4. Delete Product
- Go to "Manage Products"
- Click "Delete" button on any product
- Confirm deletion

#### 5. View Orders
- Click "View Orders" button
- See all customer orders with details
- View customer name, email, phone, address, items purchased

---

## Testing the Complete System

### Test 1: Browse Products
1. Go to homepage
2. Click "Products" in navigation
3. Browse product catalog
4. Click on any product to view details

### Test 2: Add to Cart & Checkout
1. Browse products
2. Click "Add to Cart" on any product
3. Click cart icon (top right)
4. Adjust quantities
5. Click "Proceed to Checkout"
6. Fill in customer details
7. Click "Place Order"
8. You'll see order confirmation

### Test 3: Admin Dashboard
1. Go to admin.html
2. Login with admin credentials
3. Dashboard should show:
   - Total revenue from orders
   - Number of registered users
   - Top selling products chart
   - All statistics

### Test 4: Product Management
1. Login to admin
2. Click "Manage Products"
3. Click "Add Product"
4. Add a test product:
   - Name: "Test Product"
   - Price: 999
   - Category: "Test Category"
5. Product appears in table
6. Edit the product
7. Delete the product

---

## Troubleshooting

### Problem: "Connection failed" error
**Solution:**
- Ensure MySQL is running in XAMPP
- Check database name is `ecommerce`
- Verify credentials in `backend/db.php`

### Problem: "MongoDB connection error"
**Solution:**
- Start MongoDB: `mongod`
- Check `.env` file has correct MONGO_URI
- For Atlas: verify network access allows your IP

### Problem: Admin dashboard shows all zeros
**Solution:**
- Ensure Node.js server is running (port 5001)
- Check browser console for errors
- Verify `backend/analytics.php` is accessible
- Add some test orders first

### Problem: "CORS policy" error
**Solution:**
- Ensure auth server is running
- Clear browser cache
- Check browser console for specific error

### Problem: Products not loading
**Solution:**
- Verify database has products (import setup_db.sql)
- Check Apache is running
- Open: http://localhost/Agboedo-Ecommerce-Website/backend/manage_products.php
- Should return JSON array of products

### Problem: Can't add products
**Solution:**
- Login to admin first
- Check browser console for errors
- Verify PHP backend is accessible
- Check MySQL database connection

---

## File Structure Explained

```
Agboedo-Ecommerce-Website/
│
├── Frontend (HTML/CSS/JS)
│   ├── index.html              # Homepage
│   ├── products.html           # Product catalog
│   ├── cart.html              # Shopping cart
│   ├── checkout.html          # Checkout page
│   ├── admin.html             # Admin dashboard
│   ├── styles.css             # Main styles
│   ├── admin.css              # Admin styles
│   ├── script.js              # Main JavaScript
│   └── admin.js               # Admin JavaScript
│
├── Backend (PHP - MySQL)
│   ├── db.php                 # Database connection
│   ├── checkout.php           # Process orders
│   ├── analytics.php          # Dashboard data
│   ├── manage_products.php    # Product CRUD
│   ├── admin_orders.php       # Get orders
│   └── setup_db.sql           # Database schema
│
└── Backend (Node.js - MongoDB)
    └── auth/
        ├── server.js          # Authentication API
        ├── package.json       # Dependencies
        └── .env               # Configuration
```

---

## API Endpoints Reference

### Authentication (Node.js - Port 5001)
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/admin_register` - Register admin
- `GET /api/admin_exists` - Check admin exists
- `GET /api/users_count` - Get user count

### Products (PHP)
- `GET /backend/manage_products.php` - Get all products
- `POST /backend/manage_products.php` - Add product
- `PUT /backend/manage_products.php` - Update product
- `DELETE /backend/manage_products.php?id={id}` - Delete product

### Orders (PHP)
- `POST /backend/checkout.php` - Create order
- `GET /backend/admin_orders.php` - Get all orders
- `GET /backend/analytics.php` - Get analytics data

---

## Database Schema

### MySQL Tables

**products**
```sql
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(255) NOT NULL
price DECIMAL(10,2) NOT NULL
category VARCHAR(255)
image VARCHAR(255)
description TEXT
```

**orders**
```sql
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(255) NOT NULL
email VARCHAR(255) NOT NULL
phone VARCHAR(20)
address TEXT NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

**order_items**
```sql
id INT PRIMARY KEY AUTO_INCREMENT
order_id INT (FOREIGN KEY -> orders.id)
product_name VARCHAR(255) NOT NULL
price DECIMAL(10,2) NOT NULL
quantity INT NOT NULL
```

### MongoDB Collections

**users**
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String,
  role: String ('user' or 'admin')
}
```

---

## Common Tasks

### Add Sample Products
1. Login to admin dashboard
2. Click "Manage Products"
3. Add products one by one, or
4. Import more from `backend/setup_db.sql`

### View Database
- **MySQL**: http://localhost/phpmyadmin
- **MongoDB**: Use MongoDB Compass or Atlas web interface

### Reset Admin Password
1. Open MongoDB shell or Compass
2. Find user with role 'admin'
3. Update password field
4. Or delete admin and re-register

### Clear All Orders
```sql
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
```

### Backup Database
```bash
# MySQL
mysqldump -u root -p ecommerce > backup.sql

# MongoDB
mongodump --db agboedo --out backup/
```

---

## Production Deployment Checklist

- [ ] Change admin password
- [ ] Implement password hashing (bcrypt)
- [ ] Use environment variables for credentials
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add input validation and sanitization
- [ ] Set up MongoDB Atlas for production
- [ ] Use proper hosting (not localhost)
- [ ] Add error logging
- [ ] Implement rate limiting
- [ ] Add backup strategy

---

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify all services are running
3. Check browser console for errors
4. Check server logs for errors

**Contact:**
- Email: support@hometechspares.com
- GitHub: https://github.com/HilaryOkonkwo

---

**Last Updated**: October 2025  
**Version**: 1.0.0
