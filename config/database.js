const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'mysql';

const sequelizeConfig = {
    dialect: dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log, // Set to false in production
    define: {
        timestamps: true,
        underscored: true,
    }
};

// For SQLite, adjust configuration
if (dialect === 'sqlite') {
    sequelizeConfig.storage = process.env.DB_STORAGE || './database.sqlite';
    delete sequelizeConfig.host;
    delete sequelizeConfig.port;
    delete sequelizeConfig.database;
    delete sequelizeConfig.username;
    delete sequelizeConfig.password;
}

const sequelize = new Sequelize(sequelizeConfig);

// Test connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };