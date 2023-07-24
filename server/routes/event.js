const specificRouter = require("./specificRouter");
const controller = require("../controllers/event");
const EventService = require("../services/event");
const TagService = require("../services/tag");
const eventPermission = require("../middlewares/event-permissions");
const SessionService = require("../services/session");
const ViewerService = require("../services/viewer");


const routesList = [
  {
    path: "/:siteId", method: "get", action: "getAllEventsForSite"
  },
  {
    path: "/", method: "post", action: "create",
    middlewares: [eventPermission.canAccessEvent]
  }
];

const eventController =
  new controller(new EventService(), new TagService(), new SessionService(), new ViewerService(), {});

module.exports = new specificRouter(
  eventController,
  routesList
);