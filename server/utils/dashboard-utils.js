module.exports = function dashboardUtil() {
  return {
    formateKpi: async function(kpi) {
      if (kpi.startsWith("Tag ")) {
        return "oneTag";
      } else if (kpi.startsWith("Conversion Tunnel ")) {
        return "conversionTunnel";
      } else if (kpi.startsWith("Total Users")) {
        return "totalUsers";
      } else if (kpi.startsWith("New Users")) {
        return "newUsers";
      } else if (kpi.startsWith("Sessions")) {
        return "sessions";
      }
      return "pageView";

    }
  };
};