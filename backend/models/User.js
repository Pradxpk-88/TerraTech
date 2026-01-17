const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true // Can be updated after OTP login
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: true // Only needed if we support password login
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'farmer',
        validate: {
            isIn: [['farmer', 'vendor', 'admin', 'expert', 'agent']]
        }
    },
    language_preference: {
        type: DataTypes.STRING,
        defaultValue: 'en'
    },
    profile_image_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location_lat: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    location_lng: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});

module.exports = User;
