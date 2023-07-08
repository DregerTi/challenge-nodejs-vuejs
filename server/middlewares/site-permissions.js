const ForbiddenError = require('../errors/ForbiddenError');

module.exports = {
    canAccessSite: function (roles) {
        return function (req, res, next) {
            if (!req.user.roles.find((role) => role.siteId === parseInt(req.params.id, 10) && roles.includes(role.role))) {
                return next(new ForbiddenError());
            }
            next();
        };
    }
}