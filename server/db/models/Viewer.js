module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
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

  Viewer.associate = (models) => {
    Viewer.belongsTo(models.Site, {foreignKey: 'siteId'});
  }


  return Viewer;
};
