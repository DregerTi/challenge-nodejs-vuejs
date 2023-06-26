module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const Viewer = require("./Viewer")(connection);
  class Session extends Model {}

  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sessionKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      device: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stoppedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "session" }
  );

  Session.belongsTo(Viewer, { foreignKey: 'idViewer' });

  return Session;
};
