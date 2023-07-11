const specificRouter = require("./specificRouter");
const SiteInvitationService = require("../services/siteInvitation");
const SiteUserService = require("../services/siteUser");
const genericController = require("../controllers/generic");
const checkAuth = require("../middlewares/check-auth");
const invitationPermissions = require("../middlewares/invitations-permissions");
const tokenGenerator = require("../utils/token-generator");

const routesList = [
    {
        path: "/", method: "post", action: "create",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.isUserSiteAdmin(['ADMIN'])]
    },
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.canAccessInvitation(['ADMIN'])]
    },
    {
        path: "/:id/accept", method: "get", action: "accept",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.canAnswerInvitation()]

    },
    {
        path: "/:id/refuse", method: "get", action: "refuse",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.canAnswerInvitation()]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, invitationPermissions.isUserSiteAdmin(['ADMIN'])]
    },
]

const service = new SiteInvitationService();
const controller = new genericController(service);
const siteUserService = new SiteUserService();

controller.accept = async (req, res, next) => {
    const {id} = req.params;
    try {
        const invitation = await service.findOne({id: parseInt(id, 10)});
        if (!invitation) return res.sendStatus(404);
        if (invitation.accepted) return res.status(409).json({error: 'Invitation already accepted'});
        const [result] = await service.update({id: parseInt(id, 10)}, {accepted: true, ...invitation});
        if (result) {
            const siteUserResult = await siteUserService.create({
                siteId: invitation.siteId,
                userId: invitation.userId,
                role: invitation.role,
            });
            res.status(201).json(siteUserResult);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
};
controller.refuse = async (req, res, next) => {
    const {id} = req.params;
    try {
        const invitation = await service.findOne({id: parseInt(id, 10)});
        if (!invitation) return res.sendStatus(404);
        if (invitation.accepted) return res.sendStatus(409);
        const [result] = await service.update({id: parseInt(id, 10)}, {
            accepted: false,
            invitation
        });
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
};
module.exports = new specificRouter(
    controller,
    routesList
);