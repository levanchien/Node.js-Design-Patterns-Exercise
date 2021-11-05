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
    throw new Error("debug() must be implemented");
  }

  _info() {
    throw new Error("info() must be implemented");
  }

  _warn() {
    throw new Error("warn() must be implemented");
  }

  _error() {
    throw new Error("error() must be implemented");
  }
};
