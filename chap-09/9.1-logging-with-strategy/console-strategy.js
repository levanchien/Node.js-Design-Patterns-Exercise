module.exports.consoleStrategy = {
  info: (info) => console.info(...info),
  debug: (debug) => console.debug(...debug),
  warn: (warn) => console.warn(...warn),
  error: (error) => console.error(...error),
};
