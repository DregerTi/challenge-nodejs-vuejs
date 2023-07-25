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
    }
  }
}