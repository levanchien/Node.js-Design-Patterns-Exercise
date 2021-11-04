const colors = require("colors");

module.exports.createColoredConsole = function (console) {
  return new Proxy(console, {
    get(t, p, r) {
      if (["red", "yellow", "green"].includes(p)) {
        return function (...args) {
          t.log(colors[p](...args));
        };
      }
      return t[p];
    },
  });
};

module.exports.createColoredConsole2 = function (log) {
  log.red = (...args) => {
    log.log(colors.red(...args));
  };
  log.yellow = (...args) => {
    log.log(colors.yellow(...args));
  };
  log.green = (...args) => {
    log.log(colors.green(...args));
  };

  return log;
};
