const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('connection has been established successfully');
        return { success: true, message: 'connection to database has been successfully' };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return { success: false, message: 'connection failed' };
    }
};

module.exports = { sequelize, connectToDatabase };
