const cache = new Map();

module.exports = function (axios) {
  return new Proxy(axios, {
    get(target, propKey, receiver) {
      /* proxy */
      if (propKey === "get") {
        return function (...args) {
          const [url] = args;

          const cached = cache.get(url);

          if (!cached) {
            return target.get(...args).then(
              (res) => {
                cache.set(url, res);
                return res;
              },
              (err) => {
                return err;
              }
            );
          }

          return Promise.resolve(cached);
        };
      }

      /* decorator */
      if (propKey === "clearCache") {
        return function (url) {
          if (url) {
            return cache.delete(url);
          }
          cache.clear();
        };
      }

      return target[propKey];
    },
  });
};
