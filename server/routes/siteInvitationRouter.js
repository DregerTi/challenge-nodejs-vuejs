const specificRouter = require("./specificRouter");
const siteInvitationController = require("../controllers/siteInvitation");
const SiteInvitationService = require("../services/siteInvitation");
const SiteUserService = require("../services/SiteUser");

const routesList = [
    {path: "/", method: "get", action: "getAll"},
    {path: "/", method: "post", action: "create"},
    {path: "/:id", method: "get", action: "getOne"},
    {path: "/:id/accept", method: "get", action: "accept"},
    {path: "/:id/refuse", method: "get", action: "refuse"},
    {path: "/:id", method: "delete", action: "delete"},
]
module.exports = new specificRouter(
    new siteInvitationController(new SiteInvitationService(), new SiteUserService()),
    routesList
);