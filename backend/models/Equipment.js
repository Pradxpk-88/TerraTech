const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Equipment = sequelize.define('Equipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    rental_price_per_hour: {
        type: DataTypes.DECIMAL(10, 2)
    },
    rental_price_per_day: {
        type: DataTypes.DECIMAL(10, 2)
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    operational_location: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'equipment',
    timestamps: true,
    underscored: true
});

// Associations
User.hasMany(Equipment, { foreignKey: 'vendor_id' });
Equipment.belongsTo(User, { foreignKey: 'vendor_id' });

module.exports = Equipment;
