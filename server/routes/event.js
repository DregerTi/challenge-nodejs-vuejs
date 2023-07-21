const specificRouter = require("./specificRouter");
const checkAuth = require("../middlewares/check-auth");
const sitePermissions = require("../middlewares/site-permissions");
const controller = require("../controllers/event");

const routesList = [
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite()]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite()]
    },
    {
        path: "/:id", method: "put", action: "update",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite()]
    },

]

module.exports = new specificRouter(
    controller,
    routesList
);


