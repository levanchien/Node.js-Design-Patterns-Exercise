const proxiedMethod = ["warn", "error", "debug", "info"];

module.exports.createTimestampedLogger = function (logger) {
  return new Proxy(logger, {
    get(t, p, r) {
      if (proxiedMethod.includes(p)) {
        return function (...args) {
          t[p](`${new Date()}:`, ...args);
        };
      }

      return t[p];
    },
  });
};
