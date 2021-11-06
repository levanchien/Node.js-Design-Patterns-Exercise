const colors = require("colors");

module.exports = function (color) {
  return function (message) {
    return color ? colors[color](message) : message;
  };
};
