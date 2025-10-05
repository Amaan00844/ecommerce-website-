<?php
// add_to_cart.php - Add a product to the cart (session-based)
session_start();
header('Content-Type: application/json');

$product_id = $_POST['product_id'] ?? null;
$qty = $_POST['qty'] ?? 1;

if (!$product_id) {
    echo json_encode(['success' => false, 'message' => 'No product ID']);
    exit;
}

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if (isset($_SESSION['cart'][$product_id])) {
    $_SESSION['cart'][$product_id] += $qty;
} else {
    $_SESSION['cart'][$product_id] = $qty;
}

echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
?>
