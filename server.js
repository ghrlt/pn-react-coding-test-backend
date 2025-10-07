require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./config/init');

const PORT = process.env.PORT || 3000;

// Test database connection before starting server
initializeDatabase().then(async () => {
    await testConnection();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database. Server not started.');
    process.exit(1);
});