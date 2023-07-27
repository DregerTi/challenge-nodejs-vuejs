const ValidationError = require("../errors/ValidationError");
const tokenGenerator = require("../utils/token-generator");
const eventUtils = require("../utils/events-utils");
const Event = require("../mongodb/models/event");


module.exports = function Controller(EventService, TagService, SessionService, ViewerService, UntrackPathService, ConversionTunnelTagService, SiteService, options) {
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

        const result = (await EventService.findAllAggregate(aggregate))[0];

        result.currentPeriod.map((item) => {
          item.previousPeriodCount = result.previousPeriod.find((previousItem) => previousItem.path === item.path)?.count ?? 0;
        });
        result.previousPeriod = undefined;

        res.write(`data: ${JSON.stringify(result)}\n\n`);
        const changeStream = Event.watch();

        changeStream.on("change", async (change) => {
          if (change.fullDocument.type === "view") {
            try {
              const result = (await EventService.findAllAggregate(aggregate))[0];
              result.currentPeriod.map((item) => {
                item.previousPeriodCount = result.previousPeriod.find((previousItem) => previousItem.path === item.path)?.count ?? 0;
              });
              result.previousPeriod = undefined;
              res.write(`data: ${JSON.stringify(result)}\n\n`);
            } catch (err) {
              next(err);
            }
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
    getHeatmapPaths: async function(req, res, next) {
      const { id } = req.params;
      const { startDate, endDate, searchString } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end } =
        eventUtils().getRangeDates(startDate, endDate);

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const siteUrl = await SiteService.findOne({ id });

      const aggregate = eventUtils().getHeatmapPathsAggregate(id, start, end, searchString);
      const result = await EventService.findAllAggregate(aggregate);

      result.map((item) => {
        item.path = item.path.replace(siteUrl.url, "");
      });
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
    getHeatmapForPath: async function(req, res, next) {
      const { id } = req.params;
      const { startDate, endDate, size, path } = req.query;
      if (!["sm", "md", "lg"].includes(size)) {
        res.status(400).json({ message: "Invalid size" });
        return;
      }
      if (!path) {
        res.status(400).json({ message: "Invalid path" });
        return;
      }
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end } =
        eventUtils().getRangeDates(startDate, endDate);

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const aggregate = eventUtils().getHeatmapForPathAggregate(id, start, end, path, size);
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
      } catch (err) {
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
    },
    getOneConversionTunnel: async function(req, res, next) {
      const { id, conversionTunnelId } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);

      // get all tags of the conversion tunnel ordered by their position


      const tags = await ConversionTunnelTagService.findAll({ conversionTunnelId: parseInt(conversionTunnelId, 10)}, { order: { order: 'ASC' } });
      if (tags.length === 0) {
        res.status(404).json({ message: "Conversion tunnel not found" });
        return;
      }

      if (start === undefined || end === undefined || start > end) {
        res.status(400).json({ message: "Invalid date" });
        return;
      }

      const tagIds = tags.map(tag => String(tag.tagId))

      const aggregate = eventUtils().getConversionTunnelAggregate(id, tagIds, start, end, previousPeriodStart, previousPeriodEnd);
      const result = await EventService.findAllAggregate(aggregate);

      let validated = 0;
      let nonValidated = 0;

      let currentTag = 0;

      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].events.length; j++) {
          if (result[i].events[j].tagId === tagIds[currentTag]) {
            if (currentTag === tagIds.length - 1) {
              currentTag = 0;
              validated++;
              continue;
            }
            currentTag++;
          } else {
            nonValidated++;
          }
        }
      }

      const finalRes = {
        taux: (validated / (validated + nonValidated)) * 100,
      }


      res.write(`data: ${JSON.stringify(finalRes)}\n\n`);

      const changeStream = Event.watch();
      changeStream.on("change", async (change) => {
        if (change.fullDocument.type === 'tag') {
          try {
            let validated = 0;
            let nonValidated = 0;

            let currentTagPosition = 0;
            const result = await EventService.findAllAggregate(aggregate);
            for (let i = 0; i < result.length; i++) {
              for (let j = 0; j < result[i].events.length; j++) {
                if (result[i].events[j].tagId === tagIds[currentTagPosition]) {
                  if (currentTagPosition === tagIds.length - 1) {
                    currentTagPosition = 0;
                    validated++;
                    continue;
                  }
                  currentTagPosition++;
                } else {
                  nonValidated++;
                }
              }
            }
            const finalRes = {
              taux: (validated / (validated + nonValidated)) * 100,
            }

            res.write(`data: ${JSON.stringify(finalRes)}\n\n`);
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
    }
  };
};