const genericController = require("../controllers/generic");
const SiteService = require("../services/site");
const specificRouter = require("./specificRouter");
const checkAuth = require("../middlewares/check-auth");
const sitePermissions = require("../middlewares/site-permissions");
const SiteUserService = require("../services/siteUser");
const tokenGenerator = require("../utils/token-generator");
const UserService = require("../services/user");
const Site = require("../db/models/site");

//module.exports = new genericRouter(new genericController(new SiteService()));
const routesList = [
    {
        path: "/", method: "get", action: "getAll"},
    {
        path: "/my-sites", method: "get", action: "getMySites",
        middlewares: [checkAuth.requireAuthentication]
    },
    {
        path: "/", method: "post", action: "create",
        middlewares: [checkAuth.requireAuthentication]
    },
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN', 'USER'])]
    },
    {
        path: "/:id", method: "update", action: "patch",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "replace", action: "put",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/renew-api-key", method: "get", action: "renewApiKey",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/users", method: "get", action: "getUsers",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['USER', 'ADMIN'])]
    }
]

const service = new SiteService();
const userSiteService = new SiteUserService();
const userService = new UserService();
const controller = new genericController(service);

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
        const site = await service.findOne({id: parseInt(id, 10)});
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

module.exports = new specificRouter(
    controller,
    routesList
);

/*
"userId": 2,
        "role": "ADMIN",
        "siteId": 13
 */