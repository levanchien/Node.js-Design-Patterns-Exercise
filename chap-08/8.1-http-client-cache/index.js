const axios = require("axios");

const simpleCache = new Map();

const axiosWithCache = require("./axios-cache")(axios, simpleCache);

const url = "https://jsonplaceholder.typicode.com/photos/100";

(async function test() {
  for (let i = 0; i < 5; i += 1) {
    console.time(`Call ${i + 1}`);
    await axiosWithCache.get(url);
    if (i === 3) {
      /* try to clear cache */
      axiosWithCache.clearCache(url);
    }
    console.timeEnd(`Call ${i + 1}`);
  }
})();
