<?php
// migrate_products.php - Migrate products from JS to DB
require 'db.php';

$products = [
    // AC Parts
    [ "name" => "AC Blower Motor", "price" => 2300, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Blower+Motor", "description" => "High-quality replacement blower motor for various AC units. Ensures efficient air circulation." ],
    [ "name" => "AC Capacitor 45/5 µF", "price" => 380, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Capacitor", "description" => "Dual run capacitor for AC compressor and fan motors." ],
    [ "name" => "AC Copper Installation Kit", "price" => 3950, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Copper+Kit", "description" => "Complete kit with copper pipes, insulation, and wiring for split AC installation." ],
    [ "name" => "AC Air Filter Set", "price" => 450, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Air+Filter", "description" => "Set of high-density filters to ensure clean air and protect the AC unit." ],
    [ "name" => "AC Remote Control", "price" => 350, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Remote", "description" => "Universal remote control compatible with most major AC brands." ],
    [ "name" => "AC Condenser Fan Motor", "price" => 1950, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Condenser+Motor", "description" => "Durable fan motor for the outdoor condenser unit." ],
    [ "name" => "AC Expansion Valve", "price" => 1250, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Expansion+Valve", "description" => "Regulates refrigerant flow into the evaporator." ],
    [ "name" => "AC PCB Control Board", "price" => 4600, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+PCB", "description" => "Main circuit board for controlling all functions of the air conditioner." ],
    [ "name" => "AC Drain Pipe (5m)", "price" => 260, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Drain+Pipe", "description" => "Flexible 5-meter pipe for condensate water drainage." ],
    [ "name" => "AC Compressor Mount Kit", "price" => 520, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=Compressor+Mount", "description" => "Rubber and metal mounts to reduce compressor vibration and noise." ],
    [ "name" => "AC Thermistor Sensor", "price" => 320, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Thermistor", "description" => "Temperature sensor for accurate room climate control." ],
    [ "name" => "AC Outdoor Unit Fan Blade", "price" => 740, "category" => "AC Parts", "image" => "https://placehold.co/600x400?text=AC+Fan+Blade", "description" => "Replacement fan blade for the outdoor condenser unit." ],

    // Refrigerator Parts
    [ "name" => "Refrigerator Defrost Timer", "price" => 1250, "category" => "Refrigerator Parts", "image" => "https://placehold.co/600x400?text=Defrost+Timer", "description" => "Controls the defrost cycle in frost-free refrigerators." ],
    [ "name" => "Door Gasket (Universal)", "price" => 990, "category" => "Refrigerator Parts", "image" => "https://placehold.co/600x400?text=Door+Gasket", "description" => "Universal door seal to maintain internal temperature and efficiency." ],
];

$stmt = $pdo->prepare('INSERT INTO products (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)');

foreach ($products as $product) {
    $stmt->execute([
        $product['name'],
        $product['price'],
        $product['category'],
        $product['image'],
        $product['description']
    ]);
}

echo "Products migrated successfully.";
?>
