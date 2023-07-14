const specificRouter = require("./specificRouter");
const genericController = require("../controllers/generic");
const checkAuth = require("../middlewares/check-auth");
const invitationPermissions = require("../middlewares/invitations-permissions");
const TagService = require("../services/tag");

const routesList = [
    {
        path: "/", method: "post", action: "create",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.isUserSiteAdmin(['ADMIN'])]
    },
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.canAccessInvitation(['ADMIN', 'USER'])]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.isUserSiteAdmin(['ADMIN'])]
    },
]

const service = new TagService();
const controller = new genericController(service);

controller.create = async function (req, res, next) {
    const body = req.body;
    try {
        body.createdBy = req.user.id;
        const tag = await service.create(req.body);
        res.status(201).json(tag);
    } catch (err) {
        next(err);
    }
}
controller.getOne = async function (req, res, next) {
    try {
        const tag = req.tag;
        if (!tag) {
            return res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = new specificRouter(
    controller,
    routesList
);