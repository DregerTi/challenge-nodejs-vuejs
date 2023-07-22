const specificRouter = require("./specificRouter");
const controller = require("../controllers/event");
const EventService = require("../services/event");
const TagService = require("../services/tag");
const eventPermission = require("../middlewares/event-permissions");


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
  new controller(new EventService(), new TagService());

module.exports = new specificRouter(
  eventController,
  routesList
);