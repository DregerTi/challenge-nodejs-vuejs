const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = {
    requireAuthentication: function (req, res, next) {
        if (!req.headers.authorization) {
            return next(new UnauthorizedError());
        }
        const [type, token] = req.headers.authorization.split(" ");
        if (type !== "Bearer") {
            return next(new UnauthorizedError());
        }
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return next(new UnauthorizedError());
        }
        next();
    },
};
