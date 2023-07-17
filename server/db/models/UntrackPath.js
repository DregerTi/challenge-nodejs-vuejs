module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  class UntrackPath extends Model {}

  UntrackPath.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: {
            msg: 'URL must be a valid URL'
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "untrackPath" }
  );

  UntrackPath.associate = (models) => {
    UntrackPath.belongsTo(models.Site, {foreignKey: 'siteId'});
    UntrackPath.belongsTo(models.User, {foreignKey: 'createdBy'});
  }


  return UntrackPath;
};
