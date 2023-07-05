const genericController = require("../controllers/generic");
const SiteService = require("../services/site");
const specificRouter = require("./specificRouter");
const checkAuth = require("../middlewares/check-auth");
const sitePermissions = require("../middlewares/site-permissions");
const SiteUserService = require("../services/siteUser");

//module.exports = new genericRouter(new genericController(new SiteService()));
const routesList = [
    {path: "/", method: "get", action: "getAll"},
    {
        path: "/my-sites", method: "get", action: "getMySites",
        middlewares: [checkAuth.requireAuthentication]
    },
    {path: "/", method: "post", action: "create"},
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN', 'USER'])]
    },
    {
        path: "/:id", method: "update", action: "update",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "replace", action: "replace",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
]

const service = new SiteService();
const controller = new genericController(service);
controller.getMySites = async function getMySites(req, res, next) {
    try {
        const sites = await service.findUserSites({userId: req.user.id});
        res.status(200).json(sites);
    } catch (error) {
        next(error);
    }
}
module.exports = new specificRouter(
    controller,
    routesList
);