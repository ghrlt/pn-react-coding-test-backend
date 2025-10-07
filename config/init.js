const { sequelize } = require('./database');
const fs = require('fs');
const path = require('path');

// Function to sync all models
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables (use with caution)
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
        throw error;
    }
};

// Function to drop all tables
const dropDatabase = async () => {
    try {
        await sequelize.drop();
        console.log('All tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables:', error);
        throw error;
    }
};

// Function to initialize database
const initializeDatabase = async () => {
    const dialect = process.env.DB_DIALECT || 'mysql';

    if (dialect === 'sqlite') {
        const dbPath = process.env.DB_STORAGE || './database.sqlite';
        if (!fs.existsSync(dbPath)) {
            console.log('SQLite database file does not exist. Creating database and tables...');
            await syncDatabase();
        } else {
            console.log('SQLite database file already exists.');
        }
    } else if (dialect === 'mysql') {
        // Optionally run init.sql if it exists
        const sqlPath = path.join(__dirname, '..', 'database', 'init.sql');
        if (fs.existsSync(sqlPath)) {
            console.log('Running init.sql for MySQL...');
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await sequelize.query(sql);
        }
        // Primarily rely on Sequelize sync
        await syncDatabase();
    }
};

module.exports = { syncDatabase, dropDatabase, initializeDatabase };