<?php
// manage_products.php - API for CRUD operations on products
require 'db.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all products
        $stmt = $pdo->query('SELECT * FROM products');
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
        break;

    case 'POST':
        // Add new product
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name'], $data['price'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name and price are required']);
            exit;
        }
        $stmt = $pdo->prepare('INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)');
        try {
            $stmt->execute([
                $data['name'],
                $data['price'],
                $data['category'] ?? null,
                $data['description'] ?? null
            ]);
            echo json_encode(['success' => true, 'message' => 'Product added successfully', 'id' => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Update product
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'], $data['name'], $data['price'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID, name and price are required']);
            exit;
        }
        $stmt = $pdo->prepare('UPDATE products SET name = ?, price = ?, category = ?, description = ? WHERE id = ?');
        $stmt->execute([
            $data['name'],
            $data['price'],
            $data['category'] ?? null,
            $data['description'] ?? null,
            $data['id']
        ]);
        echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
        break;

    case 'DELETE':
        // Delete product
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            exit;
        }
        $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Product deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
