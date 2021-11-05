module.exports = class Logger {
  debug(...debug) {
    this._debug(debug);
  }

  info(...info) {
    this._info(info);
  }

  warn(...warn) {
    this._warn(warn);
  }

  error(...error) {
    this._error(error);
  }

  _debug() {
    throw new Error("debug() muust be implemented");
  }

  _info() {
    throw new Error("info() muust be implemented");
  }

  _warn() {
    throw new Error("warn() muust be implemented");
  }

  _error() {
    throw new Error("error() muust be implemented");
  }
};
