const { Site, SiteUser } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function SiteService() {
    return {
        findAll: async function (filters, options) {
            for (const key in filters) {
                if (!["name", "url", "createdAt", "updatedAt", "userId"].includes(key)) {
                    delete filters[key];
                }
            }
            let showSiteUsers = true;
            if (filters?.userId) {
                filters = {
                    ...filters,
                    "$SiteUsers.userId$": filters.userId,
                };
                delete filters.userId;
                showSiteUsers = false;
            }
            let dbOptions = {
                where: filters,
                subQuery: false,
                include: [{
                    model: SiteUser,
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
                dbOptions.offset = options?.offset;
            }
            return Site.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return Site.findOne({ where: filters });
        },
        create: async function (data) {
            try {
                return await Site.create(data);
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
                const [nbUpdated, users] = await Site.update(newData, {
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
            return Site.destroy({ where: filters });
        },
        addUser: async (data) => {
            return SiteUser.create(data);
        }
    };
};
