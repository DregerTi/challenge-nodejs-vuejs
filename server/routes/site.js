const specificRouter = require("./specificRouter");
const checkAuth = require("../middlewares/check-auth");
const sitePermissions = require("../middlewares/site-permissions");
const controller = require("../controllers/site");


const routesList = [
    {
        path: "/", method: "get", action: "getAll"
    },
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
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/users/:id", method: "get", action: "getOneUser",
        middlewares: [checkAuth.requireAuthentication]
    },
    {
        path: "/:id/users/:email", method: "patch", action: "updateUserRoleForSite",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/users/:email", method: "delete", action: "deleteUserFromSite",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
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
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId/tags/:tagId", method: "post", action: "addTagToConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId/tags/:tagId", method: "patch", action: "updateTagFromConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId/tags", method: "put", action: "updateTagConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/conversion-tunnels/:conversionTunnelId/tags/:tagId", method: "delete", action: "removeTagFromConversionTunnel",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/untrack-paths", method: "post", action: "createUntrackPath",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/untrack-paths/:untrackPathId", method: "get", action: "getOneUntrackPath",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/untrack-paths/:untrackPathId", method: "patch", action: "updateUntrackPath",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/untrack-paths/:untrackPathId", method: "delete", action: "deleteUntrackPath",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/untrack-paths/", method: "get", action: "getUntrackPaths",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/dashboard-items", method: "get", action: "getDashboardItems",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN', 'USER'])]
    },
    {
        path: "/:id/dashboard-items", method: "post", action: "addDashboardItem",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/dashboard-items/:dashboardItemId", method: "patch", action: "updateDashboardItem",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    },
    {
        path: "/:id/dashboard-items/:dashboardItemId", method: "delete", action: "removeDashboardItem",
        middlewares: [checkAuth.requireAuthentication, sitePermissions.canAccessSite(['ADMIN'])]
    }

]

module.exports = new specificRouter(
    controller,
    routesList
);
