const ValidationError = require("../errors/ValidationError");
const tokenGenerator = require("../utils/token-generator");

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


        startDate += "T00:00:00.001Z";
        endDate += "T23:59:59.999Z";
        const start = new Date(startDate); // Date il y a 30 jours
        const end = new Date(endDate);
        const difference = end.getTime() - start.getTime();
        const differenceInDays = Math.round(difference / (1000 * 3600 * 24));
        const previousPeriodStart = new Date(start);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - differenceInDays);
        const previousPeriodEnd = new Date(end);
        previousPeriodEnd.setDate(previousPeriodEnd.getDate() - differenceInDays);

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
                },
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
        const result = await EventService.findAllAggregate(aggregate);
        return res.json(result);
      } catch (err) {
        next(err);
      }
    },
    getAvgTimeBySession: async function(req, res, next) {
      const { id } = req.params;
      let { page } = req.query;
      try {
        if (page === undefined || page < 1) {
          page = 1;
        }
        //TODO rajouter pagination + sessions dans la réponse + date de début et de fin + uniquement moyenne pr période précédente
        const aggregate = [
          {
            $match: {
              siteId: id,
            }
          },
          {
            $group: {
              _id: "$sessionId", // Grouper par sessionId
              firstEventDate: { $min: {$toDate: "$createdAt"} }, // Trouver la première date de la session
              lastEventDate: { $max: {$toDate: "$createdAt"}} // Trouver la dernière date de la session
            }
          },
          {
            $project: {
              sessionId: "$_id", // Récupérer le sessionId en tant que clé du résultat
              _id: 0,
              duration: { $subtract: ["$lastEventDate", "$firstEventDate"] } // Calculer la durée de chaque session
            }
          },
          {
            $group: {
              _id: null, // Grouper tous les documents ensemble (pas de clé de regroupement spécifique)
              avgDuration: { $avg: "$duration" } // Calculer la moyenne des durées
            }
          }
        ];
        const result = await EventService.findAllAggregate(aggregate);
        return res.json(result);
      } catch (err) {
        next(err);
      }
    },
    getSessions : async function(req, res, next) {
      //TODO sessions + total des sessions par range de dates + le total uniquement de la période précédente
    },
    getSystemByViewer : async function(req, res, next) {
      //TODO une ligne pour chaque os contentant le nb total de viewer + range de dates avec période précédente
    },
    getBounceRate : async function(req, res, next) {
      //TODO renvoyer tous les events dont la session n'a qu'un seul event + le pourcentage que ça représente sur la globalité des sessions + range par dates + période précédente
    },
    getLocalization : async function(req, res, next) {
      //TODO une ligne pour chaque pays contenant le nb total de viewer + range de dates avec période précédente
    },
    getHeatmap : async function(req, res, next) {
      //TODO renvoyer pour un path donné tous les events rangés par device + range par dates
    },
    getNewUsers : async function(req, res, next) {
      //TODO renvoyer le total de nvx users + les viewerId avec le createdAt créés sur la période + range de dates + uniquement le total de nvx users de la période précédente
    },
    getTotalUsers : async function(req, res, next) {
      //TODO renvoyer le total des users + les viewerId avec le createdAt créés sur la période + range de dates + uniquement le total des users de la période précédente
    },
    getOneTagData : async function(req, res, next) {
      //TODO renvoyer tous les events dans la range et le total + uniquement le total de la période précédentes
    },
    getConversionTunnels : async function(req, res, next) {
      //TODO renvoyer le nb de sessions qui ont eu un event de chaque tag dans l'ordre chronologique + le nb de sessions qui ont eu l'event 1 au minimum + le nb de sessions qui ont eu l'event 1 au minimum sur la période précédente + range par dates
    }
  };
};