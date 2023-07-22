module.exports = function Controller(Service, options = {}) {
  return {
    create: async (req, res, next) => {
      const { body } = req;
      try {
        if (body.password !== body?.passwordConfirmation) {
          res.status(422).json({ password: "Password and password confirmation must match" });
          return;
        }
        const result = await Service.create(body);
        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    },
    getMyAccount: async (req, res, next) => {
      try {
const result = await Service.findOne({ id: req.user.id });
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    }
  }
}
