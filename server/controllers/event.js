const ValidationError = require("../errors/ValidationError");
const tokenGenerator = require("../utils/token-generator");
const eventUtils = require("../utils/events-utils");
const Event = require("../mongodb/models/event");
const mongoose = require("mongoose");

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
        const data = {
          ...body,
          ip: req.socket.remoteAddress,
          siteId: req.site.id,
          sessionId: session.id,
          viewerId: viewer.id,
          //TODO : à modifier + rajouter country
          //TODO : gérer les untrack path
          system: "Other"
        };
        if (data.type === "tag") {
          if (!data.tagKey) throw new ValidationError("tagKey is required for click event");
          const tag = await TagService.findOne({ siteId: req.params.siteId, tagKey: body.tagKey });
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

      // count the number of view per path
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      let page = req.query.page;

      try {
        if (page === undefined || page < 1) {
          page = 1;
        }

        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);

        //TODO
        const aggregate = [
          {
            $match: {
              type: "view",
              siteId: id,
              createdAt: { $gte: start, $lte: end }
            } // Filtrer les documents avec le champ "type" égal à "view"
          },
          {
            $facet: {
              topFive: [
                {
                  $group: {
                    _id: "$path", // Regrouper les données en fonction de la valeur du champ "path"
                    count: { $sum: 1 } // Compter le nombre de documents dans chaque groupe
                  }
                },

                {
                  $sort: { count: -1 } // Trier par nombre de vues (count) en ordre descendant (-1)
                },
                {
                  $limit: 5
                },
                {
                  $lookup: {
                    from: "events",
                    localField: "_id",
                    foreignField: "path",
                    as: "events"
                  }
                },
                {
                  $project: {
                    _id: 1,
                    count: 1,
                    events: 1
                  }
                }
              ],
              currentPeriod: [
                {
                  $group: {
                    _id: "$path", // Regrouper les données en fonction de la valeur du champ "path"
                    count: { $sum: 1 } // Compter le nombre de documents dans chaque groupe
                  }
                },

                {
                  $sort: { count: -1 } // Trier par nombre de vues (count) en ordre descendant (-1)
                },
                {
                  $limit: page * 10
                },
                {
                  $skip: (page - 1) * 10
                }
              ],
              previousPeriod: [
                {
                  $match: {
                    type: "view",
                    siteId: id,
                    createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                  }
                },
                {
                  $group: {
                    _id: "$path",
                    count: { $sum: 1 }
                  }
                },
                {
                  $sort: { count: -1 }
                },
                {
                  $limit: page * 10
                },
                {
                  $skip: (page - 1) * 10
                }
              ]
            }
          },
          {
            $project: {
              topFive: 1,
              currentPeriod: 1,
              previousPeriod: 1
            }
          }
        ];
        const result = await EventService.findAllAggregate(aggregate);
        return res.json(result);
      } catch
        (err) {
        next(err);
      }
    },
    getActiveUsers: async function(req, res, next) {
      const { id } = req.params;

      try {
        const aggregate = [
          {
            $match: {
              siteId: id,
              createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) }
            }
          },
          {
            $group: {
              _id: null, // Utiliser null comme identifiant pour grouper tous les documents ensemble
              uniqueViewerIds: { $addToSet: "$viewerId" } // Créer un ensemble distinct des viewerId
            }
          },
          {
            $project: {
              _id: 0,
              uniqueViewerCount: { $size: "$uniqueViewerIds" } // Compter le nombre d'éléments dans l'ensemble uniqueViewerIds
            }
          }
        ];
        const result = ( await EventService.findAllAggregate(aggregate))[0];
        return res.json(result);
      } catch (err) {
        next(err);
      }
    },
    getAvgTimeBySession: async function(req, res, next) {
      const { id } = req.params;
      let { page, startDate, endDate } = req.query;
      try {
        if (page === undefined || page < 1) {
          page = 1;
        }
        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);
        console.log(start, end, previousPeriodStart, previousPeriodEnd);
        const currentPeriodQuery = [
          {
            $match: {
              type: "view",
              createdAt: { $gte: start, $lte: end }
            }
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              totalSessionsCurrent: { $addToSet: "$sessionId" }
            }
          },
          {
            $project: {
              date: "$_id",
              totalSessionsCurrent: { $size: "$totalSessionsCurrent" }
            }
          }
        ];
        const previousPeriodQuery = [
          {
            $match: {
              type: "view",
              createdAt: { $gte: previousPeriodStart, $lte: previousPeriodStart }
            }
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              totalSessionsPrevious: { $addToSet: "$sessionId" }
            }
          },
          {
            $project: {
              date: "$_id",
              totalSessionsPrevious: { $size: "$totalSessionsPrevious" }
            }
          }
        ];
        //TODO rajouter pagination + sessions dans la réponse + date de début et de fin + uniquement moyenne pr période précédente


        const result = await EventService.findAllAggregate(aggregate);
        return res.json(result);
      } catch (err) {
        next(err);
      }
    },
    getSessions: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { start, end, previousPeriodStart, previousPeriodEnd } =
        eventUtils().getRangeDates(startDate, endDate);

      // Envoi d'un événement initial au client
      const aggregate = eventUtils().getSessionsDataAggregate(id, start,end, previousPeriodStart, previousPeriodEnd);
      const result = (await EventService.findAllAggregate(aggregate))[0];
      if (result?.totalSessionsPrevious === undefined) {
        result.totalSessionsPrevious = 0;
      }
      if (result?.totalSessionsCurrent === undefined) {
        result.totalSessionsCurrent = 0;
      }
      res.write(`data: ${JSON.stringify(result)}\n\n`);

      // Fonction pour envoyer des mises à jour au client
      const changeStream = Event.watch();
      changeStream.on("change", async (change) => {
        // Récupération de la mise à jour
        try {
          // Envoi d'un événement initial au client
          const aggregate = eventUtils().getSessionsDataAggregate(id, start,end, previousPeriodStart, previousPeriodEnd);
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

        // Envoi de la mise à jour au client via SSE
      });

      // Exemple de mise à jour périodique (vous pouvez remplacer cette partie avec vos données en temps réel)
      req.on("close", () => {
        changeStream.close(); // Fermer le Change Stream lorsque la connexion est fermée
        res.end();
      });
      /*


        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }*/
    },
    getSessionsData: async function(id, startDate, endDate) {


    },
    getSystemByViewer: async function(req, res, next) {
      //TODO une ligne pour chaque os contentant le nb total de viewer + range de dates avec période précédente
    },
    getBounceRate: async function(req, res, next) {
      //TODO renvoyer tous les events dont la session n'a qu'un seul event + le pourcentage que ça représente sur la globalité des sessions + range par dates + période précédente
    },
    getLocalization: async function(req, res, next) {
      //TODO une ligne pour chaque pays contenant le nb total de viewer + range de dates avec période précédente
    },
    getHeatmap: async function(req, res, next) {
      //TODO renvoyer pour un path donné tous les events rangés par device + range par dates
    },
    getNewUsers: async function(req, res, next) {
      const { id } = req.params;
      let { startDate, endDate } = req.query;
      try {
        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);
        const aggregate = [
          {
            $facet: {
              totalNewUsersCurrentPeriod: [
                {
                  $match: {
                    createdAt: { $gte: start, $lte: end }
                  }
                },
                {
                  $group: {
                    _id: "$viewerId",
                    firstEventDate: { $min: "$createdAt" }
                  }
                },
                {
                  $match: {
                    firstEventDate: { $gte: start }
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalNewUsersCurrentPeriod: { $sum: 1 }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalNewUsersCurrentPeriod: 1
                  }
                }
              ],
              totalNewUsersPreviousPeriod: [
                {
                  $match: {
                    createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                  }
                },
                {
                  $group: {
                    _id: "$viewerId",
                    firstEventDate: { $min: "$createdAt" }
                  }
                },
                {
                  $match: {
                    firstEventDate: { $gte: previousPeriodStart }
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalNewUsersPreviousPeriod: { $sum: 1 }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalNewUsersPreviousPeriod: 1
                  }
                }
              ],
              dailyNewUsers: [
                {
                  $match: {
                    createdAt: { $gte: start, $lte: end }
                  }
                },
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    newUsers: { $addToSet: "$viewerId" }
                  }
                },
                {
                  $project: {
                    date: "$_id",
                    _id: 0,
                    newUsersCount: { $size: "$newUsers" }
                  }
                },
                {
                  $sort: { date: 1 }
                }
              ]
            }
          },
          {
            $project: {
              totalNewUsersCurrentPeriod: { $arrayElemAt: ["$totalNewUsersCurrentPeriod.totalNewUsersCurrentPeriod", 0] },
              totalNewUsersPreviousPeriod: { $arrayElemAt: ["$totalNewUsersPreviousPeriod.totalNewUsersPreviousPeriod", 0] },
              dailyNewUsers: 1
            }
          }
        ];


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
      try {
        const { start, end, previousPeriodStart, previousPeriodEnd } =
          eventUtils().getRangeDates(startDate, endDate);

        const aggregate = [

          {
            $facet: {
              totalUsersCurrentPeriod: [
                {
                  $match: {
                    createdAt: { $gte: start, $lte: end }
                  }
                },
                {
                  $group: {
                    _id: "$viewerId"
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalUsersCurrentPeriod: { $sum: 1 }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalUsersCurrentPeriod: 1
                  }
                }
              ],
              totalUsersPreviousPeriod: [
                {
                  $match: {
                    createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                  }
                },
                {
                  $group: {
                    _id: "$viewerId"
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalUsersPreviousPeriod: { $sum: 1 }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalUsersPreviousPeriod: 1
                  }
                }
              ],
              dailyUsers: [
                {
                  $match: {
                    createdAt: { $gte: start, $lte: end }
                  }
                },
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    users: { $addToSet: "$viewerId" }
                  }
                },
                {
                  $project: {
                    date: "$_id",
                    _id: 0,
                    usersCount: { $size: "$users" }
                  }
                },
                {
                  $sort: { date: 1 }
                }
              ]
            }
          },
          {
            $project: {
              totalUsersCurrentPeriod: { $arrayElemAt: ["$totalUsersCurrentPeriod.totalUsersCurrentPeriod", 0] },
              totalUsersPreviousPeriod: { $arrayElemAt: ["$totalUsersPreviousPeriod.totalUsersPreviousPeriod", 0] },
              dailyUsers: 1
            }
          }
        ];
        const result = (await EventService.findAllAggregate(aggregate));
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    getOneTagData: async function(req, res, next) {
      //TODO renvoyer tous les events dans la range et le total + uniquement le total de la période précédentes
    },
    getConversionTunnels: async function(req, res, next) {
      //TODO renvoyer le nb de sessions qui ont eu un event de chaque tag dans l'ordre chronologique + le nb de sessions qui ont eu l'event 1 au minimum + le nb de sessions qui ont eu l'event 1 au minimum sur la période précédente + range par dates
    }

  };
};