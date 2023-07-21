module.exports = function Controller(Service, options = {}) {
  return {
    getAll: async (req, res, next) => {
      const { page, order, ...filters } = req.query;
      try {
        if (page !== undefined && page < 1) {
          res.json("Page can't be lower than 1").status(400);
          return;
        }
        const results = await Service.findAll(filters, {
          order,
          limit: page ? 10 : undefined,
          offset: page ? (page - 1) * 10 : undefined
        });

        res.json(results);
      } catch (err) {
        next(err);
      }
    },
    getOne: async (req, res, next) => {
      const { id } = req.params;
      try {
        const result = await Service.findOne({ id: parseInt(id, 10) });
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    create: async (req, res, next) => {
      const { body } = req;
      try {
        const result = await Service.create(body);
        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    },
    replace: async (req, res, next) => {
      const { id } = req.params;
      const { body } = req;
      try {
        const [[result, created]] = await Service.replace(
          { id: parseInt(id, 10) },
          { id: parseInt(id, 10), ...body }
        );
        if (created) res.status(201).json(result);
        else res.json(result);
      } catch (err) {
        next(err);
      }
    },
    update: async (req, res, next) => {
      const { id } = req.params;
      const { body } = req;
      try {
        const [result] = await Service.update({ id: parseInt(id, 10) }, body);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    delete: async (req, res, next) => {
      const { id } = req.params;
      try {
        const nbDeleted = await Service.delete({ id: parseInt(id, 10) });
        if (nbDeleted) res.sendStatus(204);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
  };
};
