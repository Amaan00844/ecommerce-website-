CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    image VARCHAR(255),
    description TEXT
);

INSERT INTO products (name, price, category, image, description) VALUES
('AC Blower Motor', 2300, 'AC Parts', 'https://placehold.co/600x400?text=AC+Blower+Motor', 'High-quality replacement blower motor for various AC units. Ensures efficient air circulation.'),
('AC Capacitor 45/5 µF', 380, 'AC Parts', 'https://placehold.co/600x400?text=AC+Capacitor', 'Dual run capacitor for AC compressor and fan motors.'),
('AC Copper Installation Kit', 3950, 'AC Parts', 'https://placehold.co/600x400?text=AC+Copper+Kit', 'Complete kit with copper pipes, insulation, and wiring for split AC installation.'),
('AC Air Filter Set', 450, 'AC Parts', 'https://placehold.co/600x400?text=AC+Air+Filter', 'Set of high-density filters to ensure clean air and protect the AC unit.'),
('AC Remote Control', 350, 'AC Parts', 'https://placehold.co/600x400?text=AC+Remote', 'Universal remote control compatible with most major AC brands.'),
('AC Condenser Fan Motor', 1950, 'AC Parts', 'https://placehold.co/600x400?text=AC+Condenser+Motor', 'Durable fan motor for the outdoor condenser unit.'),
('AC Expansion Valve', 1250, 'AC Parts', 'https://placehold.co/600x400?text=AC+Expansion+Valve', 'Regulates refrigerant flow into the evaporator.'),
('AC PCB Control Board', 4600, 'AC Parts', 'https://placehold.co/600x400?text=AC+PCB', 'Main circuit board for controlling all functions of the air conditioner.'),
('AC Drain Pipe (5m)', 260, 'AC Parts', 'https://placehold.co/600x400?text=AC+Drain+Pipe', 'Flexible 5-meter pipe for condensate water drainage.'),
('AC Compressor Mount Kit', 520, 'AC Parts', 'https://placehold.co/600x400?text=Compressor+Mount', 'Rubber and metal mounts to reduce compressor vibration and noise.'),
('AC Thermistor Sensor', 320, 'AC Parts', 'https://placehold.co/600x400?text=AC+Thermistor', 'Temperature sensor for accurate room climate control.'),
('AC Outdoor Unit Fan Blade', 740, 'AC Parts', 'https://placehold.co/600x400?text=AC+Fan+Blade', 'Replacement fan blade for the outdoor condenser unit.'),
('Refrigerator Defrost Timer', 1250, 'Refrigerator Parts', 'https://placehold.co/600x400?text=Defrost+Timer', 'Controls the defrost cycle in frost-free refrigerators.'),
('Door Gasket (Universal)', 990, 'Refrigerator Parts', 'https://placehold.co/600x400?text=Door+Gasket', 'Universal door seal to maintain internal temperature and efficiency.');
