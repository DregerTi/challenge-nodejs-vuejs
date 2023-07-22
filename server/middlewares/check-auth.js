const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const UserService = require("../services/user");

module.exports = {
    requireAuthentication: async function (req, res, next) {
        if (!req.headers.authorization) {
            return next(new UnauthorizedError());
        }
        const [type, token] = req.headers.authorization.split(" ");
        if (type !== "Bearer") {
            return next(new UnauthorizedError());
        }

        try {
            const userToken = jwt.verify(token, process.env.JWT_SECRET);

            const serviceUser = new UserService();
            let user = await serviceUser.findOne({id: parseInt(userToken.id, 10)});

            //TODO mdoifier ça
            user.roles = user.SiteUsers.map((role) => {
                return {
                    siteId: role.siteId,
                    role: role.role,
                };
            });
            delete user.SiteUsers;

            req.user = user;
        } catch (err) {
            return next(new UnauthorizedError());
        }
        next();
    },
};
