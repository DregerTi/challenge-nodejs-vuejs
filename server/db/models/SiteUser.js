module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const Site = require("./Site")(connection);
  const User = require("./User")(connection);
  class SiteUser extends Model {}

  SiteUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reader: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      writer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    { sequelize: connection, tableName: "siteUser" }
  );

  SiteUser.belongsTo(Site, { foreignKey: 'idSite' })
  SiteUser.belongsTo(User, { foreignKey: 'idUser' });

  return SiteUser;
};
