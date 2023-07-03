const connection = require("./db");
const fs = require("fs");
const path = require("path");

const db = { connection };

const files = fs.readdirSync(path.join(__dirname, "models"));
files.forEach((file) => {
  const model = require(path.join(__dirname, "models", file))(connection);
  db[model.name] = model;
});

const Tag = require("./models/Tag")(connection);
const User = require("./models/User")(connection);
const Site = require("./models/Site")(connection);
const ConversionTunnel = require("./models/ConversionTunnel")(connection);
const Viewer = require("./models/Viewer")(connection);
const UntrackPath = require("./models/UntrackPath")(connection);

Tag.belongsTo(User, { foreignKey: 'createdBy' });
Tag.belongsTo(Site, { foreignKey: 'idSite' });
ConversionTunnel.belongsTo(User, { foreignKey: 'userId' });
ConversionTunnel.belongsTo(Site, { foreignKey: 'siteId' });
Viewer.belongsTo(Site, { foreignKey: 'idSite' });
UntrackPath.belongsTo(User, { foreignKey: 'createdBy' })
UntrackPath.belongsTo(Site, { foreignKey: 'idSite' });

module.exports = db;
