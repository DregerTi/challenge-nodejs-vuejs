const { Site, SiteUser } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function SiteService() {
    return {
        findAll: async function (filters, options) {
            let dbOptions = {
                where: filters,
            };
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
        findUserSites: async function (filters, options) {
            let dbOptions = {
                where: filters,
            };
            // options?.order = {name: "ASC", dob: "DESC"}
            if (options?.order) {
                // => [["name", "ASC"], ["dob", "DESC"]]
                dbOptions.order = Object.entries(options.order);
            }
            if (options?.limit) {
                dbOptions.limit = options.limit;
                dbOptions.offset = options.offset;
            }
            const siteUsers = await SiteUser.findAll(dbOptions);

            return Site.findAll({
                where: {
                    id: siteUsers.map(site => site.siteId)
                }
            });
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
