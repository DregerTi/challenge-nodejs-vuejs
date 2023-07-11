const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const SiteUserService = require("../services/siteUser");
const UserService = require("../services/user");

module.exports = {
    requireAuthentication: async function (req, res, next) {
        if (!req.headers.authorization) {
            return next(new UnauthorizedError());
        }
        const [type, token] = req.headers.authorization.split(" ");
        if (type !== "Bearer") {
            console.log("Bearer")
            return next(new UnauthorizedError());
        }
        try {
            const userToken = jwt.verify(token, process.env.JWT_SECRET);

            const serviceSiteUser = new SiteUserService();
            const serviceUser = new UserService();
            let user = await serviceUser.findOne({id: parseInt(userToken.id, 10)});

            user.roles = user.SiteUsers.map((role) => {
                return {
                    siteId: role.siteId,
                    role: role.role,
                };
            });
            delete user.SiteUsers;

            req.user = user;

        } catch (err) {
            console.log(err);
            return next(new UnauthorizedError());
        }
        next();
    },
};
