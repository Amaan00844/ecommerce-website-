# 🚀 Quick Start Guide - HomeTech Spares

## Your Admin Dashboard is Complete! ✅

Your admin dashboard has **ALL** the features you requested:

### 📊 Dashboard Features
1. ✅ **Total Revenue** - Shows total website revenue in ₹
2. ✅ **Total Users** - Number of registered users
3. ✅ **Top Selling Products** - Bar chart showing best sellers
4. ✅ **Total Orders** - Count of all orders
5. ✅ **Products Sold** - Total units sold
6. ✅ **Total Products** - Products in inventory
7. ✅ **Add Product** - Create new products
8. ✅ **Remove Product** - Delete products
9. ✅ **Edit Product** - Modify product details

---

## 🎯 Start in 5 Minutes

### Step 1: Start XAMPP (2 minutes)
1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache**
3. Click **Start** for **MySQL**

### Step 2: Setup Database (1 minute)
1. Open browser: http://localhost/phpmyadmin
2. Click **"New"** → Database name: `ecommerce` → Click **"Create"**
3. Select `ecommerce` database
4. Click **"Import"** tab
5. Choose file: `backend/setup_db.sql`
6. Click **"Go"**

### Step 3: Start Node.js Server (1 minute)
```bash
cd backend/auth
npm install
npm start
```

### Step 4: Move Project to XAMPP (30 seconds)
Copy project folder to: `C:\xampp\htdocs\`

### Step 5: Open Website (30 seconds)
**Double-click**: `start-project.bat`

OR manually open:
- Website: http://localhost/Agboedo-Ecommerce-Website/index.html
- Admin: http://localhost/Agboedo-Ecommerce-Website/admin.html

---

## 🔐 Admin Login

**Default Credentials:**
- Email: `admin@admin.com`
- Password: `admin123`

---

## 📋 What You Can Do Now

### As Admin:
1. **View Dashboard** - See all analytics and charts
2. **Add Products** - Click "Manage Products" → "Add Product"
3. **Edit Products** - Click "Edit" button on any product
4. **Delete Products** - Click "Delete" button on any product
5. **View Orders** - Click "View Orders" to see customer purchases
6. **See Analytics** - Charts show sales by category and top products

### As Customer:
1. Browse products
2. Add to cart
3. Checkout
4. Place orders

---

## 📁 Important Files

- **SETUP_GUIDE.md** - Complete setup instructions
- **PROJECT_DOCUMENTATION.md** - Full technical documentation
- **start-project.bat** - Launch all servers automatically
- **backend/setup_db.sql** - Database schema with sample products

---

## 🆘 Quick Troubleshooting

**Problem: Dashboard shows all zeros**
- Ensure Node.js server is running (port 5001)
- Check MySQL is running in XAMPP
- Add some test orders first

**Problem: Can't login to admin**
- Ensure Node.js server is running
- Check MongoDB connection in `.env` file
- Use default credentials: admin@admin.com / admin123

**Problem: Products not showing**
- Import `backend/setup_db.sql` in phpMyAdmin
- Check Apache is running in XAMPP

---

## 📞 Need Help?

Check **SETUP_GUIDE.md** for detailed troubleshooting!

---

**Your full-stack e-commerce project is ready! 🎉**
