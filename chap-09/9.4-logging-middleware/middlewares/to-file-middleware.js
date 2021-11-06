const fs = require("fs/promises");

module.exports = function (file, opts = {}) {
  return async function (message) {
    await fs.appendFile(file, message + "\n", opts);
    return message;
  };
};
