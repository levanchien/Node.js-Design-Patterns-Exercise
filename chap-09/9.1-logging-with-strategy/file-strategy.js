const fs = require("fs");

const cb = () => {};

module.exports.fileStrategy = {
  info: (info) => {
    fs.appendFile("info.log", `${info.toString()}\n`, cb);
  },
  debug: (debug) => {
    fs.appendFile("debug.log", `${debug.toString()}\n`, cb);
  },
  warn: (warn) => {
    fs.appendFile("warn.log", `${warn.toString()}\n`, cb);
  },
  error: (error) => {
    fs.appendFile("error.log", `${error.toString()}\n`, cb);
  },
};
