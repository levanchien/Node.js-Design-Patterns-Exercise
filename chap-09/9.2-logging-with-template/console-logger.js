const Logger = require("./logger");

module.exports = class ConsoleLogger extends Logger {
  _debug(debug) {
    console.debug(...debug);
  }

  _info(info) {
    console.info(...info);
  }

  _warn(warn) {
    console.warn(...warn);
  }

  _error(error) {
    console.error(...error);
  }
};
