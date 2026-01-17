const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbName = process.env.DB_NAME || 'terratech';

async function createDbIfNotExists() {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'postgres', // Connect to default DB to create new one
    });

    try {
        await client.connect();
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            console.log(`${dbName} database not found, creating it...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Created database ${dbName}`);
        } else {
            console.log(`${dbName} database already exists.`);
        }
    } catch (err) {
        console.error('Error checking/creating database:', err);
        console.error('Make sure your Postgres credentials in .env are correct and the Postgres server is running.');
        process.exit(1);
    } finally {
        await client.end();
    }
}

async function runSchema() {
    await createDbIfNotExists();

    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbName,
    });

    try {
        await client.connect();
        console.log(`Connected to ${dbName}...`);

        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Applying schema...');
        await client.query(sql);
        console.log('Schema applied successfully!');
    } catch (err) {
        console.error('Error applying schema:', err);
    } finally {
        await client.end();
    }
}

runSchema();
