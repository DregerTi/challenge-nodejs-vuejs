module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class Tag extends Model {
  }

  Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          len: {
            args: [1, 32],
            msg: "Name must be between 1 and 32 characters long"
          }
        }
      },
      tagKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize: connection, tableName: "tag",
      indexes: [
        {
          unique: true,
          fields: ['name', 'tagKey', 'siteId']
        }
      ]
    }
  );


  Tag.associate = (models) => {
    Tag.belongsTo(models.User, { foreignKey: "createdBy" });
    Tag.belongsTo(models.Site, { foreignKey: "siteId" });
  };

  return Tag;
};
