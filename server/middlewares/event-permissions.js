const ForbiddenError = require("../errors/ForbiddenError");
const SiteService = require("../services/site");
const UnauthorizedError = require("../errors/UnauthorizedError");
require('dotenv').config();

NODE_ENV = process.env.NODE_ENV || "development";
module.exports = {
  canAccessEvent: async function(req, res, next) {
    const siteService = new SiteService();
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return next(new UnauthorizedError());
    }
    try {
      const site = await siteService.findOne({ apiKey: apiKey });

      if (!site) {
        return next(new ForbiddenError());
      }
      if (site.url !== req.headers.origin && NODE_ENV !== "development") {
        return next(new ForbiddenError());
      }
      req.site = site;

    } catch (err) {
      return next(new UnauthorizedError());
    }
    next();
  }

};