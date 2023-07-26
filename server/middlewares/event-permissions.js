const ForbiddenError = require("../errors/ForbiddenError");
const SiteService = require("../services/site");
const TagService = require("../services/tag");
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
  },
  canAccessTag: async function(req, res, next) {

    const tagService = new TagService();
    const tag = await tagService.findOne({ id: req.params.tagId });
    return parseInt(tag?.siteId, 10) === parseInt(req.params.id, 10) ? next() : next(new ForbiddenError());
  }

};