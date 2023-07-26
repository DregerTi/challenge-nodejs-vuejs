const specificRouter = require("./specificRouter");
const controller = require("../controllers/event");
const EventService = require("../services/event");
const TagService = require("../services/tag");
const eventPermission = require("../middlewares/event-permissions");
const SessionService = require("../services/session");
const ViewerService = require("../services/viewer");
const UntrackPathService = require("../services/untrackPath");
const checkAuth = require("../middlewares/check-auth");
const sitePermission = require("../middlewares/site-permissions");

const routesList = [
  {
    path: "/:id", method: "get", action: "getAllEventsForSite",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/view-per-page", method: "get", action: "getViewPerPage",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/viewer-by-os", method: "get", action: "getSystemByViewer",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/viewer-by-country", method: "get", action: "getLocalization",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/session-avg-time", method: "get", action: "getAvgTimeBySession",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/total-session", method: "get", action: "getSessions",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/total-users", method: "get", action: "getTotalUsers",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/total-new-users", method: "get", action: "getNewUsers",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/active-users", method: "get", action: "getActiveUsers",
    middlewares: [checkAuth.requireAuthentication, sitePermission.canAccessSite(["ADMIN", "USER"])]
  },
  {
    path: "/:id/tag/:tagId", method: "get", action: "getOneTag",
    middlewares: [
      checkAuth.requireAuthentication,
      sitePermission.canAccessSite(["ADMIN", "USER"]),
      eventPermission.canAccessTag
    ]
  },
  {
    path: "/", method: "post", action: "create",
    middlewares: [eventPermission.canAccessEvent]
  }
];

const eventController =
  new controller(new EventService(), new TagService(), new SessionService(), new ViewerService(), new UntrackPathService(), {});

module.exports = new specificRouter(
  eventController,
  routesList
);