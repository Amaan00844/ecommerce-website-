<?php
// checkout.php - Process checkout and save order to database
require 'db.php';
session_start();
header('Content-Type: application/json');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$address = $input['address'] ?? '';
$cart = $input['items'] ?? [];

if (!$name || !$email || !$address || empty($cart)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields or cart is empty.']);
    exit;
}

try {
    // Insert order
    $stmt = $pdo->prepare('INSERT INTO orders (name, email, phone, address, created_at) VALUES (?, ?, ?, ?, NOW())');
    $stmt->execute([$name, $email, $phone, $address]);
    $order_id = $pdo->lastInsertId();

    // Insert order items with product_name and price
    $itemStmt = $pdo->prepare('INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)');
    foreach ($cart as $item) {
        $product_name = $item['name'] ?? $item['product_name'] ?? 'Unknown Product';
        $price = $item['price'] ?? 0;
        // Remove currency symbol and commas from price if present
        if (is_string($price)) {
            $price = preg_replace('/[^\d.]/', '', $price);
        }
        $qty = $item['quantity'] ?? 1;
        
        $itemStmt->execute([$order_id, $product_name, floatval($price), $qty]);
    }

    // Clear cart
    $_SESSION['cart'] = [];
    echo json_encode(['success' => true, 'order_id' => $order_id, 'message' => 'Order placed successfully!']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
