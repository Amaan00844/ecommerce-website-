const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection for products
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agboedo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected for products');
}).catch(err => console.error('MongoDB connection error:', err));

// Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Add new product
app.post('/api/products', async (req, res) => {
    const { name, price, category, image, description } = req.body;
    if (!name || !price || !category) {
        return res.status(400).json({ error: 'Name, price, and category are required.' });
    }
    try {
        const product = new Product({ name, price, category, image, description });
        await product.save();
        res.status(201).json({ message: 'Product added successfully.', product });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
    const { name, price, category, image, description } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, price, category, image, description }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

app.listen(PORT, () => console.log(`Products server running on port ${PORT}`));
