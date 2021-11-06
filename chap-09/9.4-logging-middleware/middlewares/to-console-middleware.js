module.exports = function (type) {
  return function (message) {
    console[type || "log"](message);
    return message;
  };
};
