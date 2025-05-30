const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;


require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  UPLOAD_DIR: 'uploads/',
};
