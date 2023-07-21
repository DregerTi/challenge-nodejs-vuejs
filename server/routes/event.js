const specificRouter = require("./specificRouter");
const controller = require("../controllers/event");
const EventService = require("../services/event");
const eventPermission = require("../middlewares/event-permissions");


const routesList = [
  {
    path: "/:siteId", method: "get", action: "getAllEventsForSite"
  },
  {
    path: "/:siteId", method: "post", action: "create",
    middlewares: [eventPermission.canAccesEvent]
  }
];

const eventController = new controller(new EventService());

module.exports = new specificRouter(
  eventController,
  routesList
);