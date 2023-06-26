module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const Site = require('./Site');
  class Viewer extends Model {}

  Viewer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      viewerKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "viewer" }
  );

  Viewer.belongsTo(Site, { foreignKey: 'idSite' });

  return Viewer;
};
