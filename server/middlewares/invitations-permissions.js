const ForbiddenError = require('../errors/ForbiddenError');
const SiteInvitationService = require('../services/siteInvitation');

const siteInvitationService = new SiteInvitationService();
module.exports = {
    canAccessInvitation: function (roles) {
        return function (req, res, next) {
            if (
                (!req.user.roles.find((role) => role.siteId === parseInt(req.params.siteId, 10) && roles.includes(role.role)))
                || this.isInvitationReceiver(parseInt(req.params.userId, 10), parseInt(req.user.id, 10))
            ) {
                return next(new ForbiddenError());
            }
            next();
        };
    },
    canAnswerInvitation: function ()  {
        return async (req, res, next) => {
            const site = await siteInvitationService.findOne({id: parseInt(req.params.id, 10)});
            if (!site) return next(new ForbiddenError());
            if (
                !this.isInvitationReceiver(parseInt(site.userId, 10), parseInt(req.user.id, 10))
            ) {
                return next(new ForbiddenError());
            }
            next();
        };
    },
    isUserSiteAdmin: function (roles) {
        return function (req, res, next) {
            if (!req.user.roles.find((role) => role.siteId === parseInt(req.body.siteId, 10) && roles.includes(role.role))) {
                return next(new ForbiddenError());
            }
            next();
        };
    },
    isInvitationReceiver: function (invitationUserId, currentUserId) {
        return invitationUserId === currentUserId;
    }
}