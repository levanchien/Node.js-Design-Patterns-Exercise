const proxiedMethod = ["log", "error", "debug", "info"];

module.exports = new Proxy(console, {
  get(t, p, r) {
    if (proxiedMethod.includes(p)) {
      return function (...args) {
        t[p](new Date(), ...args);
      };
    }

    return t[p];
  },
});
