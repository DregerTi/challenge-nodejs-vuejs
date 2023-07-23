const {User, SiteUser} = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

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
                showSiteUsers = false;
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
                    attributes: ["role"],
                }],
            };

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
        findOne: async function (filters, showSiteUsers = true) {
            const dbOptions = {
                where: filters,
                attributes: ["id", "firstname", "lastname", "email"],
            }
            if (showSiteUsers) {
                dbOptions.include = SiteUser;
            } else {
                dbOptions.include = [{
                    model: SiteUser,
                    attributes: ["role"],
                }];
            }
            return User.findOne(
                dbOptions,
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
    };
};
