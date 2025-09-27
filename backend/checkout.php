<?php
// checkout.php - Process checkout and save order to database
require 'db.php';
session_start();
header('Content-Type: application/json');

// Get posted data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';
$cart = $_SESSION['cart'] ?? [];

if (!$name || !$email || !$address || empty($cart)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields or cart is empty.']);
    exit;
}

try {
    // Insert order
    $stmt = $pdo->prepare('INSERT INTO orders (name, email, address, created_at) VALUES (?, ?, ?, NOW())');
    $stmt->execute([$name, $email, $address]);
    $order_id = $pdo->lastInsertId();

    // Insert order items
    $itemStmt = $pdo->prepare('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)');
    foreach ($cart as $product_id => $qty) {
        $itemStmt->execute([$order_id, $product_id, $qty]);
    }

    // Clear cart
    $_SESSION['cart'] = [];
    echo json_encode(['success' => true, 'order_id' => $order_id]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
