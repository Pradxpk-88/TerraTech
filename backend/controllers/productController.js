const Product = require('../models/Product');
const { Op } = require('sequelize');

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;

        // Search functionality
        if (req.query.search) {
            filters.name = { [Op.iLike]: `%${req.query.search}%` };
        }

        const products = await Product.findAll({ where: filters });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Private (Vendor)
exports.addProduct = async (req, res) => {
    try {
        // Only vendors/admin can add products
        if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized. Only vendors can sell products.' });
        }

        req.body.vendor_id = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Owner only)
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Make sure user is product owner
        if (product.vendor_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this product' });
        }

        product = await product.update(req.body);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Owner only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Make sure user is product owner
        if (product.vendor_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this product' });
        }

        await product.destroy();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
