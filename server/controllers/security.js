const jwt = require("jsonwebtoken");

module.exports = function SecurityController(UserService, SiteUserService) {
    return {
        login: async (req, res, next) => {
            try {
                const {email, password} = req.body;
                const user = await UserService.login(email, password);
                const userSites = await SiteUserService.findAll({userId: user.id});
                const userRoles = userSites.map((role) => {
                    return {role: role.role, siteId: role.siteId};
                });

                const token = jwt.sign(
                    {id: user.id, fullName: user.lastname + " " + user.firstname, roles: userRoles},
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );
                res.json({token});
            } catch (err) {
                next(err);
            }
        },
    };
};
