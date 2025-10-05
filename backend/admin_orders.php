<?php
// admin_orders.php - API for fetching orders
require 'db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all orders with items
    $stmt = $pdo->query('SELECT o.*, GROUP_CONCAT(oi.product_name, " (", oi.quantity, " x ", oi.price, ")") as items FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id GROUP BY o.id');
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orders);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
