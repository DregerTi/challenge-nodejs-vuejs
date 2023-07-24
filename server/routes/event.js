const specificRouter = require("./specificRouter");
const controller = require("../controllers/event");
const EventService = require("../services/event");
const TagService = require("../services/tag");
const eventPermission = require("../middlewares/event-permissions");
const SessionService = require("../services/session");
const ViewerService = require("../services/viewer");
const UntrackPathService = require("../services/untrackPath");

const routesList = [
  {
    path: "/:siteId", method: "get", action: "getAllEventsForSite",
    middlewares: [eventPermission.canAccessEvent]
  },
  {
    path: "/:siteId/view-per-page", method: "get", action: "getViewPerPage",
    middlewares: [eventPermission.canAccessEvent]
  },
  {
    path: "/:siteId/session-avg-time", method: "get", action: "getAvgTimeBySession",
    middlewares: [eventPermission.canAccessEvent]
  },
  {
    path: "/:siteId/active-users", method: "get", action: "getActiveUsers",
    middlewares: [eventPermission.canAccessEvent]
  },
  {
    path: "/", method: "post", action: "create",
    middlewares: [eventPermission.canAccessEvent]
  }
];

const eventController =
  new controller(new EventService(), new TagService(), new SessionService(), new ViewerService(), new UntrackPathService(),{});

module.exports = new specificRouter(
  eventController,
  routesList
);