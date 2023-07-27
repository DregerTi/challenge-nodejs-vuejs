module.exports = function eventUtil() {
  return {
    getRangeDates: (startDate, endDate) => {
      startDate += "T00:00:00.001Z";
      endDate += "T23:59:59.999Z";
      const start = new Date(startDate);
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
            nbViewers: { $sum: 1 }
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
            nbViewers: "$viewersBySystem.nbViewers"
          }
        },
        {
          $sort: { system: 1 }
        }
      ];
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
            nbViewers: { $sum: 1 }
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
            nbViewers: "$viewersByCountry.nbViewers"

          }
        },
        {
          $sort: { country: 1 }
        }
      ];
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
    },
    getOneTagAggregate(id, tagId, start, end, previousPeriodStart, previousPeriodEnd) {
      return [
        {
          $facet: {
            currentPeriod: [
              {
                $match: {
                  siteId: id,
                  tagId: tagId,
                  createdAt: {
                    $gte: start,
                    $lte: end
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  currentPeriodCount: { $sum: 1 },
                  currentPeriodEvents: { $push: "$$ROOT" }
                }
              },
              {
                $project: {
                  _id: 0,
                  currentPeriodCount: 1,
                  currentPeriodEvents: 1
                }
              }
            ],
            previousPeriod: [
              {
                $match: {
                  siteId: id,
                  tagId: tagId,
                  createdAt: {
                    $gte: previousPeriodStart,
                    $lte: previousPeriodEnd
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  previousPeriodCount: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  previousPeriodCount: 1
                }
              }
            ]
          }
        },
        {
          $project: {
            currentPeriod: { $arrayElemAt: ["$currentPeriod", 0] },
            previousPeriod: { $arrayElemAt: ["$previousPeriod", 0] }
          }
        }
      ];
    },
    getViewPerPageAggregate(id, start, end, previousPeriodStart, previousPeriodEnd) {
      return [
        {
          $facet: {
            currentPeriod: [
              {
                $match: {
                  siteId: id,
                  type: "view",
                  createdAt: { $gte: start, $lte: end }
                }
              },
              {
                $group: {
                  _id: { path: "$path" },
                  count: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  path: "$_id.path",
                  currentPeriodCount: "$count"
                }
              },
              {
                $sort: { currentPeriodCount: -1 }
              }
            ],
            previousPeriod: [
              {
                $match: {
                  siteId: id,
                  type: "view",
                  createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                }
              },
              {
                $group: {
                  _id: { path: "$path" },
                  count: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  path: "$_id.path",
                  count: "$count"
                }
              }
            ],
            dailyCounts: [
              {
                $match: {
                  siteId: id,
                  type: "view",
                  createdAt: {
                    $gte: start,
                    $lte: end
                  }
                }
              },
              {
                $group: {
                  _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, path: "$path" },
                  count: { $sum: 1 }
                }
              },
              {
                $project: {
                  date: "$_id.date",
                  _id: 0,
                  path: "$_id.path",
                  dailyCounts: { $sum: "$count" }
                }
              },
              {
                $group: {
                  _id: "$path",
                  dailyCounts: { $push: { date: "$date", count: "$dailyCounts" } }
                }
              },
              {
                $sort: { dailyCounts: -1 }
              },
              {
                $limit: 5
              },
              {
                $project: {
                  _id: 0,
                  path: "$_id",
                  dailyCounts: "$dailyCounts"
                }
              },
            ]
          }
        },
      ];
    },
    getAvgTimeBySessionAggregate(id, start, end, previousPeriodStart, previousPeriodEnd) {
      return [
        {
          $facet: {
            avgTimeCurrentPeriod: [
              {
                $match: {
                  siteId: id,
                  createdAt: { $gte: start, $lte: end }
                }
              },
              {
                $group: {
                  _id: "$sessionId",
                  firstCreatedAt: { $min: "$createdAt" },
                  lastCreatedAt: { $max: "$createdAt" }
                }
              },
              {
                $project: {
                  _id: 0,
                  sessionId: "$_id",
                  duration: { $subtract: ["$lastCreatedAt", "$firstCreatedAt"] }
                }
              },
              {
                $group: {
                  _id: null,
                  totalDuration: { $sum: "$duration" },
                  totalSessions: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  averageDuration: { $divide: [{ $divide: ["$totalDuration", "$totalSessions"] }, 60000] },
                  count: "$totalSessions"
                }
              }
            ],
            avgTimePreviousPeriod: [
              {
                $match: {
                  siteId: id,
                  createdAt: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
                }
              },
              {
                $group: {
                  _id: "$sessionId",
                  firstCreatedAt: { $min: "$createdAt" },
                  lastCreatedAt: { $max: "$createdAt" }
                }
              },
              {
                $project: {
                  _id: 0,
                  sessionId: "$_id",
                  duration: { $subtract: ["$lastCreatedAt", "$firstCreatedAt"] }
                }
              },
              {
                $group: {
                  _id: null,
                  totalDuration: { $sum: "$duration" },
                  totalSessions: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  averageDuration: { $divide: [{ $divide: ["$totalDuration", "$totalSessions"] }, 60000] }
                }
              }
            ],
            dailyAvgTime: [
              {
                $match: {
                  siteId: id,
                  createdAt: { $gte: start, $lte: end }
                }
              },
              {
                $group: {
                  _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sessionId: "$sessionId"
                  },
                  firstCreatedAt: { $min: "$createdAt" },
                  lastCreatedAt: { $max: "$createdAt" }
                }
              },
              {
                $project: {
                  _id: 0,
                  date: "$_id.date",
                  sessionId: "$_id.sessionId",
                  sessionDuration: { $subtract: ["$lastCreatedAt", "$firstCreatedAt"] }
                }
              },
              {
                $group: {
                  _id: "$date",
                  totalDuration: { $sum: "$sessionDuration" },
                  totalSessions: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  averageDuration: { $divide: [{ $divide: ["$totalDuration", "$totalSessions"] }, 60000] }
                }
              }
            ]
          }
        }
      ];
    },
    getTotalUsersAggregate(id, start, end, previousPeriodStart, previousPeriodEnd) {
      return [
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
    },
    getNewUsersAggregate(id, start, end, previousPeriodStart, previousPeriodEnd) {
      return [
        {
          $facet: {
            totalNewUsersCurrentPeriod: [
              {
                $match: {
                  siteId: id
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
                  firstEventDate: { $gte: start, $lte: end }
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
                  siteId: id
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
                  firstEventDate: { $gte: previousPeriodStart, $lte: previousPeriodEnd }
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
                  siteId: id
                }
              },
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                  newUsers: { $addToSet: "$viewerId" },
                  firstEventDate: { $min: "$createdAt" }
                }
              },
              {
                $match: {
                  firstEventDate: { $gte: start, $lte: end }
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
    },
    getHeatmapPathsAggregate(id, start, end, searchString) {
      return [
        {
          $match: {
            siteId: id,
            type: "click",
            size: { $ne: null },
            path: {
              $regex: searchString ? searchString : "",
              $options: "i"
            }
          }
        },
        {
          $group: {
            _id: "$path"
          }
        },
        {
          $project: {
            _id: 0,
            path: "$_id"
          }
        }
      ];
    },
    getHeatmapForPathAggregate(id, start, end, path, size) {
      return [
        {
          $match: {
            siteId: id,
            path: path,
            size: size,
            type: "click",
            createdAt: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: { x: "$coordinates.x", y: "$coordinates.y" },
            value: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            x: "$_id.x",
            y: "$_id.y",
            value: 1
          }
        },
        {
          $group: {
            _id: null,
            results: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            results: 1
          }
        }
      ];
    },
    getConversionTunnelAggregate(id, tagIdList, start, end) {
      console.log("tagIdList", tagIdList);
      return [
        {
          $match: {
            siteId: id,
            tagId : { $in: tagIdList },
            createdAt: {
              $gte: start,
              $lte: end
            }
          }
        },
        {
          $sort: { createdAt: 1 }
        },
        {
          $group: {
            _id: "$sessionId",
            events: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            session: "$_id",
            events: 1,
            _id: 0
          }
        }
      ];
    }
  };
};