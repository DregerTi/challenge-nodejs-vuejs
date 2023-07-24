const { DataTypes } = require("sequelize");
module.exports = (connection) => {
    const {DataTypes, Model} = require("sequelize");
    const bcrypt = require("bcryptjs");

    class User extends Model {
        isPasswordValid(password) {
            return bcrypt.compare(password, this.password);
        }
    }

    User.init(
        {
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 32],
                        msg: "Lastname must be between 1 and 32 characters long",
                    }
                }
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 32],
                        msg: "Lastname must be between 1 and 32 characters long",
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Email must be a valid email address",
                    }
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 32],
                        msg: "Password must be between 6 and 32 characters long",
                    },
                }
            },
            status: {
                type: DataTypes.ENUM("valid", "pending", "deleted"),
                defaultValue: "pending",
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {sequelize: connection, tableName: "users"}
    );

    User.associate = (models) => {
        User.hasMany(models.SiteUser, {foreignKey: "userId"});
    }


    function updatePassword(user) {
        return bcrypt.genSalt(10).then((salt) =>
            bcrypt.hash(user.password, salt).then((hash) => {
                user.password = hash;
            })
        );
    }

    User.addHook("beforeCreate", (user) => {
        return updatePassword(user);
    });

    User.addHook("beforeUpdate", async (user, options) => {
        if (options.fields.includes("password")) {
            return updatePassword(user);
        }
    });

    return User;
};
