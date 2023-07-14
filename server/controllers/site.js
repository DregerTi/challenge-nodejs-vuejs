const SiteService = require("../services/site");
const SiteUserService = require("../services/siteUser");
const UserService = require("../services/user");
const genericController = require("./generic");
const TagService = require("../services/tag");
const tokenGenerator = require("../utils/token-generator");

const service = new SiteService();
const userSiteService = new SiteUserService();
const userService = new UserService();
const controller = new genericController(service);
const tagService = new TagService();

controller.create = async function create(req, res, next) {
    const {body} = req;
    try {
        body.apiKey = await tokenGenerator().apiKey();
        const site = await service.create(req.body);
        await service.addUser({
            userId: parseInt(req.user.id, 10),
            siteId: parseInt(site.id),
            role: 'ADMIN'
        });
        res.status(201).json(site);
    } catch (error) {
        next(error);
    }
}
controller.getMySites = async function getMySites(req, res, next) {
    try {
        const sites = await service.findUserSites({userId: req.user.id});
        res.status(200).json(sites);
    } catch (error) {
        next(error);
    }
}
controller.renewApiKey = async function renewApiKey(req, res, next) {
    const { id } = req.params;
    try {
        const siteUser = await service.findOne({id: parseInt(id, 10)});
        if (!siteUser) {
            res.sendStatus(404);
            return;
        }

        siteUser.apiKey = await tokenGenerator().apiKey();
        const [result] = await service.update({ id: parseInt(id, 10) }, siteUser.dataValues);
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}
controller.getUsers = async function getUsers(req, res, next) {
    const { id } = req.params;
    try {
        const siteUsers = await userSiteService.findAll({siteId: parseInt(id, 10)});
        const users = await userService.findAll({id: siteUsers.map(siteUser => siteUser.userId)});
        if (users) res.json(users.map(user => {
            user.password = undefined;
            return user;
        }));
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}
controller.getTags = async function getTags(req, res, next) {
    const { id } = req.params;
    try {
        const tags = await tagService.findAll({siteId: parseInt(id, 10)});
        if (tags) res.status(200).json(tags);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}
controller.getOneTag = async function getOneTag(req, res, next) {
    const { id, tagId } = req.params;
    try {
        const tag = await tagService.findOne({id: parseInt(tagId, 10), siteId: parseInt(id, 10)});
        if (tag) res.status(200).json(tag);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}
controller.createTag = async function (req, res, next) {
    const body = req.body;
    try {
        body.createdBy = req.user.id;
        const tag = await tagService.create(req.body);
        res.status(201).json(tag);
    } catch (err) {
        next(err);
    }
}
controller.updateTag = async function (req, res, next) {
    const { tagId } = req.params;
    const body = req.body;
    try {
        const [result] = await tagService.update({ id: parseInt(tagId, 10) }, body);
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}
controller.replaceTag = async function (req, res, next) {
    const { tagId } = req.params;
    const { body } = req;
    try {
        const [[result, created]] = await tagService.replace(
            { id: parseInt(tagId, 10) },
            { id: parseInt(tagId, 10), ...body }
        );
        if (created) res.status(201).json(result);
        else res.json(result);
    } catch (err) {
        next(err);
    }
}
controller.deleteTag = async function (req, res, next) {
    const { tagId } = req.params;
    try {
        const result = await tagService.delete({ id: parseInt(tagId, 10) });
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
}

module.exports = controller;