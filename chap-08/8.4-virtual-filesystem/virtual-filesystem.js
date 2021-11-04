module.exports.createFSAdapter = function (store) {
  return {
    readFile(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (typeof options === "string") {
        options = { encoding: options };
      }

      process.nextTick(() => {
        const data = store.get(filename);
        if (!data) {
          const err = new Error(`ENOENT, open "${filename}"`);
          err.code = "ENOENT";
          err.errno = 34;
          err.path = filename;
          return callback && callback(err);
        }
        return callback && callback(null, data);
      });
    },
    writeFile(filename, contents, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (typeof options === "string") {
        options = { encoding: options };
      }

      process.nextTick(() => {
        const existedData = store.get(filename);
        if (existedData) {
          store.set(filename, existedData + contents);
        } else {
          store.set(filename, contents);
        }
        callback && callback(null, true);
      });
    },
  };
};
