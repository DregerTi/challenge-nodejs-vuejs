module.exports = function eventUtil() {
  return {
    getRangeDates: (startDate, endDate) => {
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
      return { start, end, previousPeriodStart, previousPeriodEnd };
    },
    getSessionsDataAggregate: (id, start, end, previousPeriodStart, previousPeriodEnd) => {
      return [
        {
          $facet: {
            totalSessionsCurrent: [
              {
                $match: {
                  type: "view",
                  siteId: id,
                  createdAt: { $gte: start, $lte: end }
                }
              },
              {
                $group: {
                  _id: null,
                  totalSessionsCurrent: { $addToSet: "$sessionId" }
                }
              },
              {
                $project: {
                  _id: 0,
                  totalSessionsCurrent: { $size: "$totalSessionsCurrent" }
                }
              }
            ],
            totalSessionsPrevious: [
              {
                $match: {
                  type: "view",
                  siteId: id,
                  createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                }
              },
              {
                $group: {
                  _id: null,
                  totalSessionsPrevious: { $addToSet: "$sessionId" }
                }
              },
              {
                $project: {
                  _id: 0,
                  totalSessionsPrevious: { $size: "$totalSessionsPrevious" }
                }
              }
            ],
            dailySessions: [
              {
                $match: {
                  type: "view",
                  siteId: id,
                  createdAt: { $gte: start, $lte: end }
                }
              },
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                  totalSessions: { $addToSet: "$sessionId" }
                }
              },
              {
                $project: {
                  date: "$_id",
                  _id: 0,
                  totalSessions: { $size: "$totalSessions" }
                }
              }
            ]
          }
        },
        {
          $project: {
            totalSessionsCurrent: { $arrayElemAt: ["$totalSessionsCurrent.totalSessionsCurrent", 0] },
            totalSessionsPrevious: { $arrayElemAt: ["$totalSessionsPrevious.totalSessionsPrevious", 0] },
            dailySessions: 1
          }
        }
      ];
    },
    getOsAggregate: (id, start, end) => {
      return [
        {
          $match: {
            siteId: id,
            createdAt: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: { system: "$system", viewerId: "$viewerId" },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: "$_id.system",
            nbViewers: { $sum: 1 },
          }
        },
        {
          $group: {
            _id: null,
            viewersBySystem: { $push: { system: "$_id", nbViewers: "$nbViewers" } }
          }
        },
        {
          $unwind: "$viewersBySystem"
        },
        {
          $project: {
            _id: 0,
            system: "$viewersBySystem.system",
            nbViewers: "$viewersBySystem.nbViewers",

          }
        },
        {
          $sort: { system: 1 } // Tri par ordre alphabétique du système (facultatif)
        }
      ]
    },
    getLocalizationDatas: (id, start, end) => {
      return [
        {
          $match: {
            siteId: id,
            createdAt: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: { country: "$country", viewerId: "$viewerId" },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: "$_id.country",
            nbViewers: { $sum: 1 },
          }
        },
        {
          $group: {
            _id: null,
            viewersByCountry: { $push: { country: "$_id", nbViewers: "$nbViewers" } }
          }
        },
        {
          $unwind: "$viewersByCountry"
        },
        {
          $project: {
            _id: 0,
            country: "$viewersByCountry.country",
            nbViewers: "$viewersByCountry.nbViewers",

          }
        },
        {
          $sort: { country: 1 } // Tri par ordre alphabétique du système (facultatif)
        }
      ]
    },
    getActiveUsersAggregate: (id) => {
      return [
        {
          $match: {
            siteId: id,
            createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: null,
            uniqueViewerIds: { $addToSet: "$viewerId" }
          }
        },
        {
          $project: {
            _id: 0,
            uniqueViewerCount: { $size: "$uniqueViewerIds" }
          }
        }
      ];
    }
  }
}