require('dotenv').config();

NODE_ENV = process.env.NODE_ENV || "development";

const config = {
    development: {
        databaseUrl: 'postgres://root:password@db:5432/app',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'app',
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
    testLocal: {
        databaseUrl: 'postgres://root:password@db:5432/app',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'app_test',
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
    test: {
        databaseUrl: 'postgres://root:password@127.0.0.1:5432/app',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'app_test',
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
    production: {
        databaseUrl: 'postgres://root:password@127.0.0.1:5432/prod',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'app_production',
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
};

module.exports = config[NODE_ENV];