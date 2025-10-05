<?php
// upload_image.php - API to handle image uploads

header('Content-Type: application/json');

$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file uploaded']);
        exit;
    }

    $file = $_FILES['image'];
    $fileName = basename($file['name']);
    $targetFilePath = $targetDir . uniqid() . "-" . $fileName;

    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array($fileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Only JPG, JPEG, PNG, GIF files are allowed']);
        exit;
    }

    if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
        // Return the relative URL to the uploaded image
        echo json_encode(['url' => $targetFilePath]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload image']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
