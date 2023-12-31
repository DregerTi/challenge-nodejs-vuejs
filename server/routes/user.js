const specificRouter = require("./specificRouter");
const controller = require("../controllers/user");
const checkAuth = require("../middlewares/check-auth");
const UserService = require("../services/user");

const routesList = [
  {
    path: "/me", method: "get", action: "getMyAccount",
    middlewares: [checkAuth.requireAuthentication]
  },
  {
    path: "/:id", method: "patch", action: "updateMyAccount",
    middlewares: [checkAuth.requireAuthentication]
  },
  {
    path: "/:id", method: "delete", action: "deleteMyAccount",
    middlewares: [checkAuth.requireAuthentication]
  },
  {
    path: "/reset-password/:token", method: "patch", action: "resetPassword",
  },
  {
    path: "/validate/:token", method: "get", action: "validateAccount",
  },
];

  module.exports = new specificRouter(new controller(new UserService()), routesList);
