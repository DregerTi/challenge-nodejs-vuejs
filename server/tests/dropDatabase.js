const db = require("../db");

module.exports = async function clearDatabase() {
    for (const modelName in db.connection.models) {
        await db[modelName].destroy({where: {}});
    }
}