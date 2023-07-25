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
    }
  }
}