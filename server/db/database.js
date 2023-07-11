require('dotenv').config();

NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'app',
      port: process.env.DB_PORT,
      dialect: 'postgres',
  },
  test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'app',
      port: process.env.DB_PORT,
      dialect: 'postgres',
  },
  production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'app_production',
      port: process.env.DB_PORT,
      dialect: 'postgres',
  },
};

module.exports = config[NODE_ENV];