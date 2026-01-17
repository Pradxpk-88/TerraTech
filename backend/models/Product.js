const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    usage_instructions: {
        type: DataTypes.TEXT
    },
    suitable_crops: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
    }
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
});

// Associations
User.hasMany(Product, { foreignKey: 'vendor_id' });
Product.belongsTo(User, { foreignKey: 'vendor_id' });

module.exports = Product;
