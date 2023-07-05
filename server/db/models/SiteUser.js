module.exports = (connection) => {
    const {DataTypes, Model} = require("sequelize");
    const Site = require("./Site")(connection);
    const User = require("./User")(connection);

    class SiteUser extends Model {
    }

    SiteUser.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role: {
                type: DataTypes.STRING(32),
                allowNull: false,
                defaultValue: 'USER',
            },
        },
        {sequelize: connection, tableName: "siteUser", indexes: [{unique: true, fields: ['userId', 'siteId']}]}
    );

    SiteUser.belongsTo(Site, {foreignKey: 'siteId'})
    SiteUser.belongsTo(User, {foreignKey: 'userId'});

    return SiteUser;
};
