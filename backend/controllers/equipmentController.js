const Equipment = require('../models/Equipment');

// @desc    Get all equipment (with filtering)
// @route   GET /api/equipment
// @access  Public
exports.getEquipment = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.location) filters.operational_location = req.query.location; // Simple exact match for now

        const equipment = await Equipment.findAll({ where: filters });

        res.status(200).json({
            success: true,
            count: equipment.length,
            data: equipment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Public
exports.getEquipmentById = async (req, res) => {
    try {
        const item = await Equipment.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Equipment not found' });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add new equipment
// @route   POST /api/equipment
// @access  Private (Vendor/Farmer)
exports.addEquipment = async (req, res) => {
    try {
        // Add user to req.body
        req.body.vendor_id = req.user.id;

        const equipment = await Equipment.create(req.body);

        res.status(201).json({
            success: true,
            data: equipment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Private (Owner only)
exports.updateEquipment = async (req, res) => {
    try {
        let equipment = await Equipment.findByPk(req.params.id);

        if (!equipment) {
            return res.status(404).json({ success: false, message: 'Equipment not found' });
        }

        // Make sure user is equipment owner
        if (equipment.vendor_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this equipment' });
        }

        equipment = await equipment.update(req.body);

        res.status(200).json({
            success: true,
            data: equipment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Private (Owner only)
exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);

        if (!equipment) {
            return res.status(404).json({ success: false, message: 'Equipment not found' });
        }

        // Make sure user is equipment owner
        if (equipment.vendor_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this equipment' });
        }

        await equipment.destroy();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
