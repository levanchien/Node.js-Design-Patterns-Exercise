module.exports = function (axios, simpleCache) {
  return new Proxy(axios, {
    get(target, propKey, receiver) {
      /* proxy */
      if (propKey === "get") {
        return function (...args) {
          const [url] = args;

          const cached = simpleCache.get(url);

          if (!cached) {
            return target.get(...args).then(
              (res) => {
                simpleCache.set(url, res);
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
            return simpleCache.delete(url);
          }
          simpleCache.clear();
        };
      }

      return target[propKey];
    },
  });
};
