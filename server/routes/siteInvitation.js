const {Router} = require("express");
//const SiteInvitationService = require("../services/siteInvitation");
//const SiteInvitationController = require("../controllers/siteInvitation");

module.exports = function(Controller) {

    //const genericController = require("../controllers/generic");
    //const activeGenericController = new genericController(new SiteInvitationService());
    //const activeSiteInvitationController = new SiteInvitationController(new SiteInvitationService());

    const router = new Router();
    router.get("/", Controller.getAll);
    router.post("/", Controller.create);

    router.get("/:id", Controller.getOne);
    router.patch("/accept/:id", Controller.accept);
    router.patch("/refuse/:id", Controller.refuse);

    return router;
}