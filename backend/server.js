const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Basic Health Check Route
app.get('/', (req, res) => {
    res.json({
        message: 'Agricultural Platform API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Routes
const authRoutes = require('./routes/auth');
const { connectDB } = require('./config/db');

// Connect Database
connectDB();

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/products', require('./routes/products'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
