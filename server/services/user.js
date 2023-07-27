const {User, SiteUser} = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");
const tokenGenerator = require("../utils/token-generator");

module.exports = function UserService() {
    return {
        findAll: async function (filters, options) {
            for (const key in filters) {
                if (!["firstname", "lastname", "email", "password", "siteId", "role", "createdAt", "updatedAt"].includes(key)) {
                    delete filters[key];
                }
            }
            let showSiteUsers = true;
            if (filters?.siteId) {
                filters = {
                    ...filters,
                    "$SiteUsers.siteId$": filters.siteId,
                };
                delete filters.siteId;
            }
            if (filters?.role) {
                filters = {
                    ...filters,
                    "$SiteUsers.role$": filters.role,
                };
                delete filters.role;
                showSiteUsers = false;
            }
            let dbOptions = {
                where: filters,
                attributes: ["id", "firstname", "lastname", "email", "createdAt", "updatedAt"],
                subQuery: false,
                include: [{
                    model: SiteUser,
                    attributes: ["role", "siteId"],
                }],
            };
            if (!showSiteUsers) {
                dbOptions.include[0].attributes = [];
            }
            // options.order = {name: "ASC", dob: "DESC"}
            if (options?.order) {
                // => [["name", "ASC"], ["dob", "DESC"]]
                dbOptions.order = Object.entries(options.order);
            }
            if (options?.limit) {
                dbOptions.limit = options.limit;
                dbOptions.offset = options.offset;
            }
            return User.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return User.findOne(
                {
                    where: filters,
                    include: SiteUser
                }
            );
        },
        create: async function (data) {
            try {
                return await User.create(data);
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        replace: async function (filters, newData) {
            try {
                const nbDeleted = await this.delete(filters);
                const user = await this.create(newData);
                return [[user, nbDeleted === 0]];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        update: async (filters, newData) => {
            try {
                const [_nbUpdated, users] = await User.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return users;
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        delete: async (filters) => {
            return User.destroy({where: filters});
        },
        login: async (email, password) => {
            const user = await User.findOne({where: {email}});
            if (!user) {
                throw new ValidationError({
                    email: "Invalid credentials",
                });
            }
            const isPasswordValid = await user.isPasswordValid(password);
            if (!isPasswordValid) {
                throw new ValidationError({
                    email: "Invalid credentials",
                });
            }

            return user;
        },
        resetPassword: async (token, data) => {
            const user = await User.findOne({where: {token: token}});
            if (!user) {
                throw new ValidationError({
                    email: "User not found",
                });
            }
            if (data.password !== data?.passwordConfirmation) {
                throw new ValidationError({
                    password: "Password and password confirmation must match",
                });
            }
            const isPasswordValid = await user.isPasswordValid(data.oldPassword);
            if (!isPasswordValid) {
                throw new ValidationError({
                    oldPassword: "Invalid password",
                });
            }
            const newToken = await tokenGenerator().token();
            return user.update({password: data.password, token: newToken});
        },
        validateAccount: async (token) => {
            const user = await User.findOne({where: {token: token}});
            if (!user) {
                throw new ValidationError({
                    email: "User not found",
                });
            }
            return user.update({status: "valid"});
        },
        getRole: async (userId) => {
            const sites = await SiteUser.findAll({where: {userId: userId}});

            if (sites.length === 0) {
                return "user";
            }

            return sites.map(site => ({ 
                siteId: site.siteId,
                role: site.role
            }));
        },

    };
};
