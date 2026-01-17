const express = require('express');
const router = express.Router();
const {
    getEquipment,
    getEquipmentById,
    addEquipment,
    updateEquipment,
    deleteEquipment
} = require('../controllers/equipmentController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getEquipment)
    .post(protect, addEquipment);

router.route('/:id')
    .get(getEquipmentById)
    .put(protect, updateEquipment)
    .delete(protect, deleteEquipment);

module.exports = router;
