module.exports = function tokenGenerator() {
  return {
    apiKey: async () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    tagKey: async () => {
      return Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
    },
    sessionKey: async () => {
      return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
  };
};