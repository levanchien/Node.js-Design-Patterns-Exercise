module.exports = class Logger {
  constructor(strategy) {
    this.strategy = strategy;
  }

  debug(...debug) {
    this.strategy.debug(debug);
  }

  info(...info) {
    this.strategy.info(info);
  }

  warn(...warn) {
    this.strategy.warn(warn);
  }

  error(...error) {
    this.strategy.error(error);
  }
};
