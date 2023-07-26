const ValidationError = require("../errors/ValidationError");
const tokenGenerator = require("../utils/token-generator");
const eventUtils = require("../utils/events-utils");
const Event = require("../mongodb/models/event");


module.exports = function Controller(EventService, TagService, SessionService, ViewerService, UntrackPathService, options) {
  return {
    getAllEventsForSite: async function(req, res, next) {
      const { id } = req.params;
      const { page, order, ...filters } = req.query;

      try {
        if (page !== undefined && page < 1) {
          res.json("Page can't be lower than 1").status(400);
          return;
        }
        filters.siteId = id;
        let options = {};
        if (page) {
          options = { skip: (page - 1) * 10, limit: page * 10 };
        }
        const result = await EventService.findAll(filters, null, options);
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
        const regexps = await UntrackPathService.findAll({ siteId: req.site.id });
        const results = regexps.every((regexp) => {
            return !(new RegExp(regexp.url).test(body?.path));
          }
        );
        if (!results) {
          res.status(422).json({ message: "Untrack path" });
          return;
        }
        let viewer = await ViewerService.findOne({ viewerKey: body?.viewerKey });

        if (!viewer) {
          viewer = await ViewerService.create({ viewerKey: body?.viewerKey });
        } else {
          await ViewerService.update({ id: viewer.id }, {});
        }
        let session = await SessionService.findOne({ viewerId: viewer.id }, [["updatedAt", "DESC"]]);

        if (!session || Date.now() - session.updatedAt > 15 * 60 * 1000) {
          const sessionKey = await tokenGenerator().sessionKey();
          session = await SessionService.create({ sessionKey: sessionKey, viewerId: viewer.id, device: body?.device });
        } else {
          session = (await SessionService.update({ id: parseInt(session.id, 10) }, { updatedAt: Date.now() }))[0];
        }
        const ip = req.socket.remoteAddress.replace(/^.*:/, "");

        const info = await fetch(`http://ip-api.com/json/${ip}`);
        const ipInfo = await info.json();
        const country = ipInfo?.countryCode ?? "FR";

        const data = {
          ...body,
          ip: req.socket.remoteAddress,
          siteId: req.site.id,
          sessionId: session.id,
          viewerId: viewer.id,
          country: country
        };
        if (data.type === "tag") {
          if (!data.tagKey) throw new ValidationError("tagKey is required for click event");
          const tag = await TagService.findOne({ siteId: req.site.id, tagKey: body.tagKey });
          if (!tag) throw new ValidationError("tagKey is not valid");
          data.tagId = tag.id;
        }

        const result = await EventService.create(data);
        res.status(201).json(result);

      } catch (err) {
        if (err.name === "ValidationError") {
          err = ValidationError.fromMongooseValidationError(err);
        }
        next(err);
      }
    },
    getViewPerPage: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      try {

        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);
        if (start === undefined || end === undefined || start > end) {
          res.status(400).json({ message: "Invalid date" });
          return;
        }

        const aggregate = eventUtils().getViewPerPageAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);
        const result = await EventService.findAllAggregate(aggregate);
        res.write(`data: ${JSON.stringify(result)}\n\n`);

        const changeStream = Event.watch();
        changeStream.on("change", async () => {
          try {
            const result = await EventService.findAllAggregate(aggregate);

            res.write(`data: ${JSON.stringify(result)}\n\n`);
          } catch (err) {
            next(err);
          }

        });

        req.on("close", () => {
          changeStream.close();
          res.end();
        });
      } catch
        (err) {
        next(err);
      }
    },
    getActiveUsers: async function(req, res, next) {
      const { id } = req.params;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      try {
        const aggregate = eventUtils().getActiveUsersAggregate(id);
        const result = await EventService.findAllAggregate(aggregate);
        res.write(`data: ${JSON.stringify(result)}\n\n`);

        const changeStream = Event.watch();
        changeStream.on("change", async () => {
          try {
            const aggregate = eventUtils().getActiveUsersAggregate(id);
            const result = (await EventService.findAllAggregate(aggregate))[0];

            res.write(`data: ${JSON.stringify(result)}\n\n`);
          } catch (err) {
            next(err);
          }

        });

        req.on("close", () => {
          changeStream.close();
          res.end();
        });
      } catch (err) {
        next(err);
      }
    },
    getAvgTimeBySession: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);
      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate = eventUtils().getAvgTimeBySessionAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);
      const result = (await EventService.findAllAggregate(aggregate))[0];
      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async () => {
        try {
          const result = (await EventService.findAllAggregate(aggregate))[0];

          res.write(`data: ${JSON.stringify(result)}\n\n`);
        } catch (err) {
          next(err);
        }

      });

      req.on("error", (err) => {
        changeStream.close();
        res.end();
      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    },
    getSessions: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);
      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate = eventUtils().getSessionsDataAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);
      const result = (await EventService.findAllAggregate(aggregate))[0];
      if (result?.totalSessionsPrevious === undefined) {
        result.totalSessionsPrevious = 0;
      }
      if (result?.totalSessionsCurrent === undefined) {
        result.totalSessionsCurrent = 0;
      }
      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async () => {
        try {
          const aggregate = eventUtils().getSessionsDataAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);
          const result = (await EventService.findAllAggregate(aggregate))[0];
          if (result?.totalSessionsPrevious === undefined) {
            result.totalSessionsPrevious = 0;
          }
          if (result?.totalSessionsCurrent === undefined) {
            result.totalSessionsCurrent = 0;
          }
          res.write(`data: ${JSON.stringify(result)}\n\n`);
        } catch (err) {
          next(err);
        }

      });

      req.on("error", (err) => {
        changeStream.close();
        res.end();
      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    },
    getSystemByViewer: async function(req, res, next) {
      const { id } = req.params;
      const { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end } =
        eventUtils().getRangeDates(startDate, endDate);

      const aggregate = eventUtils().getOsAggregate(id, start, end);
      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const result = await EventService.findAllAggregate(aggregate);

      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async () => {
        try {
          const result = await EventService.findAllAggregate(aggregate);

          res.write(`data: ${JSON.stringify(result)}\n\n`);
        } catch (err) {
          next(err);
        }

      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    },
    getLocalization: async function(req, res, next) {
      const { id } = req.params;
      const { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end } =
        eventUtils().getRangeDates(startDate, endDate);

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate = eventUtils().getLocalizationDatas(id, start, end);
      const result = await EventService.findAllAggregate(aggregate);

      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async () => {
        try {
          const result = await EventService.findAllAggregate(aggregate);

          res.write(`data: ${JSON.stringify(result)}\n\n`);
        } catch (err) {
          next(err);
        }

      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    },
    getHeatmap: async function(req, res, next) {

    },
    getNewUsers: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      try {

        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);

        if (start === undefined || end === undefined || start > end) {
          res.status(400).json({ message: "Invalid date" });
          return;
        }

        const aggregate = eventUtils().getNewUsersAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);


        const result = (await EventService.findAllAggregate(aggregate))[0];
        if (result?.totalNewUsersCurrentPeriod === undefined) {
          result.totalNewUsersCurrentPeriod = 0;
        }
        if (result?.totalNewUsersPreviousPeriod === undefined) {
          result.totalNewUsersPreviousPeriod = 0;
        }

        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    getTotalUsers: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      try {
      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate = eventUtils().getTotalUsersAggregate(id, start, end, previousPeriodStart, previousPeriodEnd);
      const result = (await EventService.findAllAggregate(aggregate))[0];

      if (result?.totalUsersPreviousPeriod === undefined) {
        result.totalUsersPreviousPeriod = 0;
      }
      if (result?.totalUsersCurrentPeriod === undefined) {
        result.totalUsersCurrentPeriod = 0;
      }

      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async (change) => {
        try {
          const result = (await EventService.findAllAggregate(aggregate))[0];
          if (result?.totalUsersPreviousPeriod === undefined) {
            result.totalUsersPreviousPeriod = 0;
          }
          if (result?.totalUsersCurrentPeriod === undefined) {
            result.totalUsersCurrentPeriod = 0;
          }
          res.write(`data: ${JSON.stringify(result)}\n\n`);
        } catch (err) {
          next(err);
        }
      });

      req.on("error", (err) => {
        changeStream.close();
        res.end();
      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    } catch(err) {
      next(err);
    }

  },
    getOneTag: async function(req, res, next) {
    const { id, tagId } = req.params;
    let { startDate, endDate } = req.query;
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate =
        eventUtils().getOneTagAggregate(id, tagId, start, end, previousPeriodStart, previousPeriodEnd);

      const result = (await EventService.findAllAggregate(aggregate))[0];
      if (result.currentPeriod === undefined) {
        result.currentPeriod = {
          currentPeriodCount: 0,
          currentPeriodEvents: []
        };
      }
      if (result.previousPeriod === undefined) {
        result.previousPeriod = {
          previousPeriodCount: 0
        };
      }
      res.write(`data: ${JSON.stringify(result)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async (change) => {
        if (change.fullDocument.type === "tag") {
          try {
            const aggregate = eventUtils().getOneTagAggregate(id, tagId, start, end, previousPeriodStart, previousPeriodEnd);
            const result = (await EventService.findAllAggregate(aggregate))[0];
            if (result.currentPeriod === undefined) {
              result.currentPeriod = {
                currentPeriodCount: 0,
                currentPeriodEvents: []
              };
            }
            if (result.previousPeriod === undefined) {
              result.previousPeriod = {
                previousPeriodCount: 0
              };
            }
            res.write(`data: ${JSON.stringify(result)}\n\n`);
          } catch (err) {
            next(err);
          }
        }


      });

      req.on("error", (err) => {
        changeStream.close();
        res.end();
      });

      req.on("close", () => {
        changeStream.close();
        res.end();
      });
    } catch (err) {
      next(err);
    }
  }

,
  getConversionTunnels: async function(req, res, next) {
    //TODO renvoyer le nb de sessions qui ont eu un event de chaque tag dans l'ordre chronologique + le nb de sessions qui ont eu l'event 1 au minimum + le nb de sessions qui ont eu l'event 1 au minimum sur la période précédente + range par dates
  }

};
}
;