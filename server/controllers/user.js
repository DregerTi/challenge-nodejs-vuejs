const EmailService = require("../services/email");

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
        console.log("result", result);
        await EmailService.sendConfirmationEmail(result.email);
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
    },
    updateMyAccount: async (req, res, next) => {
      const { body } = req;
      try {
        const result = await Service.update(req.user.id, body);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    deleteMyAccount: async (req, res, next) => {
      try {
        const result = await Service.delete(req.user.id);
        if (result) res.sendStatus(204);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    resetPassword: async (req, res, next) => {
      const { body } = req;
      try {
        if (body.password !== body?.passwordConfirmation) {
          res.status(422).json({ password: "Password and password confirmation must match" });
          return;
        }
        const result = await Service.resetPassword(req.params.token, body);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    validateAccount: async (req, res, next) => {
      try {
        const result = await Service.validateAccount(req.params.token);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    }
  };
};
