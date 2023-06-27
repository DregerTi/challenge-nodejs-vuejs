module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const User = require("./User");
  const Site = require("./Site");
  class Tag extends Model {}

  Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          len: [1, 32],
        }
      },
      tagKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "tag" }
  );

  Tag.belongsTo(User, { foreignKey: 'createdBy' })
  Tag.belongsTo(Site, { foreignKey: 'idSite' });

  return Tag;
};