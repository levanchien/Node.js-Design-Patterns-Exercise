const axios = require("axios");

const axiosWithCache = require("./axios-cache")(axios);

const url = "https://jsonplaceholder.typicode.com/photos/100";

(async function test() {
  for (let i = 0; i < 5; i += 1) {
    console.time(`Call ${i + 1}`);
    await axiosWithCache.get(url);
    if (i === 3) {
      axiosWithCache.clearCache(url);
    }
    console.timeEnd(`Call ${i + 1}`);
  }
})();
