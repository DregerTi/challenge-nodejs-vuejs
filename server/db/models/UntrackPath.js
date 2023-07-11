module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const Site = require('./Site');
  const User = require('./User');
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
          is: /^(http|https):\/\/[^ "]+$/,
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "untrackPath" }
  );


  return UntrackPath;
};
