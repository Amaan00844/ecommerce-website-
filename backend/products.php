<?php
// products.php - Fetch all products from the database
require 'db.php';
header('Content-Type: application/json');

$stmt = $pdo->query('SELECT * FROM products');
$products = $stmt->fetchAll();
echo json_encode($products);
?>
