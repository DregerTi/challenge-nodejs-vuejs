const { Tag, User, Site, SiteUser} = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function TagService() {
    return {
        findAll: async function (filters, options) {
            for (const key in filters) {
                if (!["siteId", "name", "tagKey", "createdAt", "updatedAt"].includes(key)) {
                    delete filters[key];
                }
            }
            let dbOptions = {
                where: filters,
                attributes: ["id", "name", "tagKey", "createdAt", "updatedAt"],
                include: [{
                    model: User,
                    attributes: ["firstname", "lastname", "email"],
                }]
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
            return Tag.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return Tag.findOne({ where: filters });
        },
        create: async function (data) {
            try {
                return await Tag.create(data);
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
                const [nbUpdated, users] = await Tag.update(newData, {
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
            return Tag.destroy({ where: filters });
        }
    };
};
