module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class Site extends Model {
  }

  Site.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [1, 32],
            msg: "Name must be between 1 and 32 characters long"
          }
        }
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
      kbis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          regex(str, pattern, modifiers) {
            if (!/^[0-9]{9}$/.test(str)) {
              throw new Error('Kbis must be a valid kbis');
            }
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    { sequelize: connection, tableName: "site" }
  );

  Site.associate = (models) => {
    Site.hasMany(models.SiteUser, { foreignKey: "siteId" });
    Site.hasMany(models.Viewer, { foreignKey: "siteId" });
  };

  return Site;
};
