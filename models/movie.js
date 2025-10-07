const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    metadata: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = Movie;