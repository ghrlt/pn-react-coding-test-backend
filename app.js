const express = require('express');
const cors = require('cors');

// Import database configuration
const { sequelize } = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/movies', require('./routes/movies'));

module.exports = app;