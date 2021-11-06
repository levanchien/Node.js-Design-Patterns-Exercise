const { Buffer } = require("buffer");

/* I don't know if below is the right approach  */
module.exports.createLazyBuffer = () => {
  return new Proxy(
    {},
    {
      get(t, p, r) {
        if (p === "write" && !t["_buffer"]) {
          return function (str) {
            if (!str || !str.length) {
              return;
            }
            const buffer = Buffer.alloc(str.length);
            buffer.write(str);
            this._buffer = buffer;
          };
        }

        if (!t["_buffer"]) {
          return function () {
            console.log("Please use method write() to init buffer.");
          };
        }

        return typeof t["_buffer"][p] === "function"
          ? t["_buffer"][p].bind(t["_buffer"])
          : t["_buffer"][p];
      },
    }
  );
};
