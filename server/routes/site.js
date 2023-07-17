const specificRouter = require("./specificRouter");
const checkAuth = require("../middlewares/check-auth");
const sitePermissions = require("../middlewares/site-permissions");
const controller = require("../controllers/site");


const routesList = [
    {
        path: "/", method: "get", action: "getAll"},
    {
        path: "/my-sites", method: "get", action: "getMySites",
        middlewares: [checkAuth.requireAuthentication]
    },
    {
        path: "/", method: "post", action: "create",
        middlewares: [checkAuth.requireAuthentication]
    },
    {
        path: "/:id", method: "get", action: "getOne",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN', 'USER'])]
    },
    {
        path: "/:id", method: "patch", action: "update",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "put", action: "replace",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id", method: "delete", action: "delete",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/renew-api-key", method: "get", action: "renewApiKey",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/users", method: "get", action: "getUsers",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['USER', 'ADMIN'])]
    },
    {
        path: "/:id/tags", method: "get", action: "getTags",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['USER', 'ADMIN'])]
    },
    {
        path: "/:id/tags/:tagId", method: "get", action: "getOneTag",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['USER', 'ADMIN'])]
    },
    {
        path: "/:id/tags", method: "post", action: "createTag",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/tags/:tagId", method: "patch", action: "updateTag",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/tags/:tagId", method: "put", action: "replaceTag",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/tags/:tagId", method: "delete", action: "deleteTag",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels", method: "get", action: "getConversionTunnels",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['USER', 'ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId", method: "get", action: "getOneConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels", method: "post", action: "createConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId", method: "patch", action: "updateConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId", method: "put", action: "replaceConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId", method: "delete", action: "deleteConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
]

module.exports = new specificRouter(
    controller,
    routesList
);
