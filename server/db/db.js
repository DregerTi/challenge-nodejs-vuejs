const Sequelize = require("sequelize");
const databaseConfig = require("./database");

NODE_ENV = process.env.NODE_ENV || "development";

const connection = new Sequelize(databaseConfig.databaseUrl);

connection
    .authenticate()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

module.exports = connection;