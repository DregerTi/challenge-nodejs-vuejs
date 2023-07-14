const db = require("../db");

Object.keys(db.connection.models).forEach((modelName) => {
    db[modelName].destroy({where: {}});

});