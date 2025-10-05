document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const dashboard = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('adminLoginForm');
    const loginError = document.getElementById('loginError');

    const dashboardSection = document.getElementById('dashboardSection');
    const productsSection = document.getElementById('productsSection');
    const ordersSection = document.getElementById('ordersSection');
    const productsTable = document.getElementById('productsTable').querySelector('tbody');
    const ordersTable = document.getElementById('ordersTable').querySelector('tbody');

    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');

    let currentUser = null;

    // Check if admin user exists and show register link if not
    async function checkAdminExists() {
        try {
            const response = await fetch('http://localhost:5001/api/admin_exists');
            const data = await response.json();
            if (!data.exists) {
                const registerLink = document.createElement('p');
                registerLink.innerHTML = 'No admin found. <a href="admin_register.html">Register here</a>';
                loginContainer.appendChild(registerLink);
            }
        } catch (error) {
            console.error('Error checking admin existence:', error);
        }
    }
    checkAdminExists();

    // Demo mode - show dashboard directly
    showDashboard();

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok && data.user.role === 'admin') {
                currentUser = data.user;
                localStorage.setItem('adminToken', JSON.stringify(currentUser));
                showDashboard();
            } else {
                loginError.textContent = 'Invalid credentials or not admin';
            }
        } catch (error) {
            loginError.textContent = 'Login failed';
        }
    });

    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        currentUser = null;
        showLogin();
    });

    // Navigation
    document.getElementById('showDashboard').addEventListener('click', () => {
        dashboardSection.style.display = 'block';
        productsSection.style.display = 'none';
        ordersSection.style.display = 'none';
        loadDashboard();
    });

    document.getElementById('showProducts').addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        productsSection.style.display = 'block';
        ordersSection.style.display = 'none';
        loadProducts();
    });

    document.getElementById('showOrders').addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        productsSection.style.display = 'none';
        ordersSection.style.display = 'block';
        loadOrders();
    });

    // Products
    document.getElementById('addProductBtn').addEventListener('click', () => {
        document.getElementById('productId').value = '';
        productForm.reset();
        productModal.style.display = 'flex';
    });

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('productId').value;
        const data = {
            id: id || undefined,
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value
        };

        const method = id ? 'PUT' : 'POST';
        const url = 'http://localhost/Agboedo-Ecommerce-Website/backend/manage_products.php';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok && result.success) {
                alert(result.message || 'Product saved successfully!');
                productModal.style.display = 'none';
                loadProducts();
            } else {
                alert('Error: ' + (result.error || 'Failed to save product'));
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product. Please check if the backend server is running.');
        }
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    function showDashboard() {
        loginContainer.style.display = 'none';
        dashboard.style.display = 'block';
        loadDashboard();
    }

    function showLogin() {
        loginContainer.style.display = 'block';
        dashboard.style.display = 'none';
    }

    async function loadProducts() {
        try {
            const response = await fetch('http://localhost/Agboedo-Ecommerce-Website/backend/manage_products.php');
            const products = await response.json();
            productsTable.innerHTML = '';
            products.forEach(product => {
                const row = `<tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>₹${parseFloat(product.price).toLocaleString('en-IN')}</td>
                    <td>${product.category || ''}</td>
                    <td>
                        <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>`;
                productsTable.innerHTML += row;
            });
        } catch (error) {
            console.error('Error loading products');
        }
    }

    async function loadOrders() {
        try {
            const response = await fetch('http://localhost/Agboedo-Ecommerce-Website/backend/admin_orders.php');
            const orders = await response.json();
            ordersTable.innerHTML = '';
            orders.forEach(order => {
                const row = `<tr>
                    <td>${order.id}</td>
                    <td>${order.name}</td>
                    <td>${order.email}</td>
                    <td>${order.phone}</td>
                    <td>${order.address}</td>
                    <td>${order.items}</td>
                    <td>${order.created_at}</td>
                </tr>`;
                ordersTable.innerHTML += row;
            });
        } catch (error) {
            console.error('Error loading orders');
        }
    }

    window.editProduct = async (id) => {
        try {
            const response = await fetch('http://localhost/Agboedo-Ecommerce-Website/backend/manage_products.php');
            const products = await response.json();
            const product = products.find(p => p.id == id);
            if (product) {
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productCategory').value = product.category || '';
                document.getElementById('productDescription').value = product.description || '';
                productModal.style.display = 'flex';
            }
        } catch (error) {
            alert('Error loading product');
        }
    };

    window.deleteProduct = async (id) => {
        if (confirm('Delete this product?')) {
            try {
                const response = await fetch(`http://localhost/Agboedo-Ecommerce-Website/backend/manage_products.php?id=${id}`, { method: 'DELETE' });
                if (response.ok) {
                    loadProducts();
                }
            } catch (error) {
                alert('Error deleting product');
            }
        }
    };

    let categoryChart = null;
    let topProductsChart = null;

    async function loadDashboard() {
        try {
            // Fetch real analytics data from backend
            const response = await fetch('http://localhost/Agboedo-Ecommerce-Website/backend/analytics.php');
            const data = await response.json();

            // Update stats with real data
            document.getElementById('totalSales').textContent = '₹' + (data.total_sales || 0).toLocaleString('en-IN');
            document.getElementById('orderCount').textContent = data.order_count || 0;
            document.getElementById('totalProductsSold').textContent = data.total_products_sold || 0;
            document.getElementById('recentOrders').textContent = data.recent_orders || 0;

            // Update additional stats if elements exist
            if (document.getElementById('totalProducts')) {
                document.getElementById('totalProducts').textContent = data.total_products || 0;
            }
            if (document.getElementById('usersCount')) {
                document.getElementById('usersCount').textContent = data.users_count || 0;
            }

            // Destroy existing charts before creating new ones
            if (categoryChart) {
                categoryChart.destroy();
            }
            if (topProductsChart) {
                topProductsChart.destroy();
            }

            // Sales by Category Chart
            const categoryCtx = document.getElementById('salesByCategoryChart').getContext('2d');
            if (data.sales_by_category && data.sales_by_category.length > 0) {
                categoryChart = new Chart(categoryCtx, {
                    type: 'pie',
                    data: {
                        labels: data.sales_by_category.map(item => item.category || 'Uncategorized'),
                        datasets: [{
                            data: data.sales_by_category.map(item => parseFloat(item.total_sales)),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { position: 'bottom' },
                            title: {
                                display: true,
                                text: 'Revenue by Category'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': ₹' + context.parsed.toLocaleString('en-IN');
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                // Show "No data" message
                categoryCtx.font = '16px Arial';
                categoryCtx.fillStyle = '#666';
                categoryCtx.textAlign = 'center';
                categoryCtx.fillText('No sales data available', categoryCtx.canvas.width / 2, categoryCtx.canvas.height / 2);
            }

            // Top Products Chart
            const productCtx = document.getElementById('topProductsChart').getContext('2d');
            if (data.top_products && data.top_products.length > 0) {
                topProductsChart = new Chart(productCtx, {
                    type: 'bar',
                    data: {
                        labels: data.top_products.map(item => item.product_name),
                        datasets: [{
                            label: 'Units Sold',
                            data: data.top_products.map(item => parseInt(item.total_quantity)),
                            backgroundColor: '#007bff',
                            borderColor: '#0056b3',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            y: { 
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Best Selling Products'
                            },
                            tooltip: {
                                callbacks: {
                                    afterLabel: function(context) {
                                        const revenue = data.top_products[context.dataIndex].total_revenue;
                                        return 'Revenue: ₹' + parseFloat(revenue).toLocaleString('en-IN');
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                // Show "No data" message
                productCtx.font = '16px Arial';
                productCtx.fillStyle = '#666';
                productCtx.textAlign = 'center';
                productCtx.fillText('No product sales data available', productCtx.canvas.width / 2, productCtx.canvas.height / 2);
            }

            // Display customer purchases if available
            if (data.customer_purchases && data.customer_purchases.length > 0) {
                displayCustomerPurchases(data.customer_purchases);
            } else {
                const tbody = document.querySelector('#customerPurchasesTable tbody');
                if (tbody) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #666;">No customer purchases yet</td></tr>';
                }
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
            // Fallback to showing zeros if backend is unavailable
            document.getElementById('totalSales').textContent = '₹0';
            document.getElementById('orderCount').textContent = '0';
            document.getElementById('totalProductsSold').textContent = '0';
            document.getElementById('recentOrders').textContent = '0';
            if (document.getElementById('totalProducts')) {
                document.getElementById('totalProducts').textContent = '0';
            }
            if (document.getElementById('usersCount')) {
                document.getElementById('usersCount').textContent = '0';
            }
            
            // Show error message
            alert('Unable to load dashboard data. Please ensure the backend server is running.');
        }
    }

    function displayCustomerPurchases(purchases) {
        const container = document.getElementById('customerPurchasesTable');
        if (!container) return;

        const tbody = container.querySelector('tbody');
        tbody.innerHTML = '';
        
        purchases.forEach(purchase => {
            const row = `<tr>
                <td>${purchase.name}</td>
                <td>${purchase.email}</td>
                <td>${purchase.product_name}</td>
                <td>${purchase.quantity}</td>
                <td>₹${parseFloat(purchase.price).toLocaleString('en-IN')}</td>
                <td>${new Date(purchase.created_at).toLocaleDateString('en-IN')}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }
});
