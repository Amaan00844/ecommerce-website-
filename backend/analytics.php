<?php
// analytics.php - Fetch analytics data for admin dashboard
require 'db.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Total Sales (Revenue)
$totalSalesStmt = $pdo->query('SELECT SUM(price * quantity) as total_sales FROM order_items');
$totalSales = $totalSalesStmt->fetch(PDO::FETCH_ASSOC)['total_sales'] ?? 0;

// Number of Orders
$orderCountStmt = $pdo->query('SELECT COUNT(*) as order_count FROM orders');
$orderCount = $orderCountStmt->fetch(PDO::FETCH_ASSOC)['order_count'] ?? 0;

// Total Products in Inventory
$totalProductsStmt = $pdo->query('SELECT COUNT(*) as total_products FROM products');
$totalProducts = $totalProductsStmt->fetch(PDO::FETCH_ASSOC)['total_products'] ?? 0;

// Total Users Count (from MongoDB via HTTP request)
$usersCount = 0;
try {
    $context = stream_context_create([
        'http' => [
            'timeout' => 2,
            'ignore_errors' => true
        ]
    ]);
    $usersResponse = @file_get_contents('http://localhost:5001/api/users_count', false, $context);
    if ($usersResponse !== false) {
        $usersData = json_decode($usersResponse, true);
        $usersCount = $usersData['count'] ?? 0;
    }
} catch (Exception $e) {
    // If auth server is down, default to 0
    $usersCount = 0;
}

// Sales by Category
$salesByCategoryStmt = $pdo->query('
    SELECT p.category, SUM(oi.price * oi.quantity) as total_sales
    FROM order_items oi
    JOIN products p ON oi.product_name = p.name
    GROUP BY p.category
    ORDER BY total_sales DESC
');
$salesByCategory = $salesByCategoryStmt->fetchAll(PDO::FETCH_ASSOC);

// Top Selling Products (Most Popular)
$topProductsStmt = $pdo->query('
    SELECT oi.product_name, SUM(oi.quantity) as total_quantity, SUM(oi.price * oi.quantity) as total_revenue
    FROM order_items oi
    GROUP BY oi.product_name
    ORDER BY total_quantity DESC
    LIMIT 10
');
$topProducts = $topProductsStmt->fetchAll(PDO::FETCH_ASSOC);

// Total Products Sold (Units)
$totalProductsSoldStmt = $pdo->query('SELECT SUM(quantity) as total_products FROM order_items');
$totalProductsSold = $totalProductsSoldStmt->fetch(PDO::FETCH_ASSOC)['total_products'] ?? 0;

// Recent Orders (last 30 days)
$recentOrdersStmt = $pdo->query('
    SELECT COUNT(*) as recent_orders
    FROM orders
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
');
$recentOrders = $recentOrdersStmt->fetch(PDO::FETCH_ASSOC)['recent_orders'] ?? 0;

// Customer Purchase Details (Who bought what)
$customerPurchasesStmt = $pdo->query('
    SELECT o.name, o.email, oi.product_name, oi.quantity, oi.price, o.created_at
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    ORDER BY o.created_at DESC
    LIMIT 50
');
$customerPurchases = $customerPurchasesStmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'total_sales' => floatval($totalSales),
    'order_count' => intval($orderCount),
    'total_products' => intval($totalProducts),
    'users_count' => intval($usersCount),
    'sales_by_category' => $salesByCategory,
    'top_products' => $topProducts,
    'total_products_sold' => intval($totalProductsSold),
    'recent_orders' => intval($recentOrders),
    'customer_purchases' => $customerPurchases
]);
?>
