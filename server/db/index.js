const connection = require("./db");
const fs = require("fs");
const path = require("path");

const db = {connection};

const files = fs.readdirSync(path.join(__dirname, "models"));


files.forEach((file) => {
    const model = require(path.join(__dirname, "models", file))(connection);
    console.log(model.name)
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    console.log(modelName);
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;