module.exports = function Controller(EventService, SiteService, options) {
  return {
    getAllEventsForSite: async function(req, res, next) {
      const { siteId } = req.params;
      const { page, order, ...filters } = req.query;

      try {
        if (page !== undefined && page < 1) {
          res.json("Page can't be lower than 1").status(400);
          return;
        }
        filters.siteId = siteId;
        let options = {};
        if(page) {
          options = { skip: (page - 1) * 10, limit: page * 10 };
        }
        const result = await EventService.findAll(filters, null, options);
        console.log(await EventService.countDocuments(filters, null, options))
        if (result) res.json({
          events: result,
          totalItems: await EventService.countDocuments(filters, null, options)

        });
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    create: async function(req, res, next) {
      const { body } = req;
      try {
        const data = {};
        const result = await EventService.create(body);
        res.status(201).json(result);

      } catch (err) {
        next(err);
      }
    }
  };
};