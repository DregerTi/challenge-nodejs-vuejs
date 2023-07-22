const specificRouter = require("./specificRouter");
const controller = require("../controllers/user");
const checkAuth = require("../middlewares/check-auth");
const UserService = require("../services/user");

const routesList = [
  {
    path: "/me", method: "get", action: "getMyAccount",
    middlewares: [checkAuth.requireAuthentication]
  }
];

  module.exports = new specificRouter(new controller(new UserService()), routesList);
