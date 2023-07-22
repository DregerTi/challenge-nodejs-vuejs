const { Router } = require("express");
const UserService = require("../services/user");
const SiteUserService = require("../services/siteUser");

const router = Router();

const SecurityController = require("../controllers/security")(
  new UserService(),
    new SiteUserService()
);
const UserController = require("../controllers/user")(new UserService());
 
router.post("/login", SecurityController.login);
router.post("/register", UserController.create);

module.exports = router;
