// Simple Express server for registration
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Server error.' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agboedo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');
    // Create default admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
        const admin = new User({
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin123',
            role: 'admin'
        });
        await admin.save();
        console.log('Default admin user created: email: admin@admin.com, password: admin123');
    }
})
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        // Check if user exists
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(409).json({ error: 'Username or email already exists.' });
        }
        // Save new user
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        // For simplicity, plain text password comparison (should use hashing in production)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        // Successful login
        res.status(200).json({ message: 'Login successful.', user: { username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Admin exists endpoint
app.get('/api/admin_exists', async (req, res) => {
    try {
        const admin = await User.findOne({ role: 'admin' });
        res.status(200).json({ exists: !!admin });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

// Admin registration endpoint
app.post('/api/admin_register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            return res.status(409).json({ error: 'Admin already exists.' });
        }
        // Check if user exists
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(409).json({ error: 'Username or email already exists.' });
        }
        // Save new admin user
        const admin = new User({ username, email, password, role: 'admin' });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (err) {
        console.error('Admin registration error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// Users count endpoint for analytics
app.get('/api/users_count', async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'user' });
        res.status(200).json({ count });
    } catch (err) {
        console.error('Users count error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
