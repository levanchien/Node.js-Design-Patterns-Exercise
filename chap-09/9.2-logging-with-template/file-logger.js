const fs = require("fs");
const Logger = require("./logger");

const cb = () => {};

module.exports = class FileLogger extends Logger {
  _debug(debug) {
    fs.appendFile("debug.log", `${debug.toString()}\n`, cb);
  }

  _info(info) {
    fs.appendFile("info.log", `${info.toString()}\n`, cb);
  }

  _warn(warn) {
    fs.appendFile("warn.log", `${warn.toString()}\n`, cb);
  }

  _error(error) {
    fs.appendFile("error.log", `${error.toString()}\n`, cb);
  }
};
