const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'terratech',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false, // Set to console.log to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected Successfully.');
    } catch (error) {
        console.error('Unable to connect to the database. Server will continue in degraded mode:', error.message);
        // process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
