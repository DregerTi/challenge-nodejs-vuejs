const specificRouter = require("./specificRouter");
const SiteInvitationService = require("../services/siteInvitation");
const SiteUserService = require("../services/siteUser");
const genericController = require("../controllers/generic");
const checkAuth = require("../middlewares/check-auth");
const invitationPermissions = require("../middlewares/invitations-permissions");
const UserService = require("../services/user");

const routesList = [
    {
        path: "/my-invitations", method: "get", action: "getMyInvitations",
        middlewares: [checkAuth.requireAuthentication]
    },
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
const userService = new UserService();

controller.getMyInvitations = async (req, res, next) => {
    try {
        const invitations = await service.findAll({userId: req.user.id});
        res.status(200).json(invitations);
    } catch (err) {
        next(err);
    }
}
controller.create = async (req, res, next) => {
    const {siteId, email, role} = req.body;
    try {
        const user = await userService.findOne({email});
        if (!user) return res.status(404).json({error: 'User not found'});
        if (user.id === req.user.id) return res.status(409).json({error: 'You cannot invite yourself'});
        const invitation = await service.create({siteId, userId: user.id, role});
        res.status(201).json(invitation);
    } catch (err) {
        next(err);
    }
}
controller.accept = async (req, res, next) => {
    const {id} = req.params;
    try {
        const invitation = await service.findOne({id: parseInt(id, 10)});
        if (!invitation) return res.sendStatus(404);
        if (invitation.accepted !== null) return res.status(409).json({error: 'Invitation already accepted or refused'});
        const [result] = await service.update({id: parseInt(id, 10)}, {accepted: true, ...invitation});
        if (result) {
            await siteUserService.create({
                siteId: invitation.siteId,
                userId: invitation.userId,
                role: invitation.role,
            });
            res.status(200).json(result);
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
        if (invitation.accepted !== null) return res.sendStatus(409).json({error: 'Invitation already accepted or refused'});
        const [result] = await service.update({id: parseInt(id, 10)}, {
            accepted: false,
            invitation
        });
        if (result) res.status(200).json(result);
        else res.sendStatus(404);
    } catch (err) {
        next(err);
    }
};
module.exports = new specificRouter(
    controller,
    routesList
);