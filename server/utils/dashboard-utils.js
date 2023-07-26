module.exports = function dashboardUtil() {
  return {
    formateKpi: async function(kpi) {
      if (kpi.startsWith("Tag ")) {
        return "oneTag";
      } else if (kpi.startsWith("Conversion Tunnel ")) {
        return "conversionTunnel";
      } else if (kpi === "Total Users") {
        return "totalUsers";
      } else if (kpi === "New Users") {
        return "newUsers";
      } else if (kpi === "Sessions") {
        return "sessions";
      } else if (kpi === "Avg Time By Session") {
        return "avgTimeBySession";
      } else if (kpi === "Active Users") {
        return "activeUsers";
      } else if (kpi === "Viewer By Country") {
        return "viewerByCountry";
      } else if (kpi === "Viewer By OS") {
        return "viewerByOs";
      }
      return "pageView";

    }
  };
};