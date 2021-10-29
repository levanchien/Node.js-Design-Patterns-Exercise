import mapAsync from "./map-async.mjs";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const delay = (val) =>
  new Promise((resolve) => setTimeout(() => resolve(val), 500));

mapAsync(
  [1, 1, 1, 1, 1, 1, 1, 1],
  (val) => {
    return delay(val + getRandomInt(10));
  },
  2
).then(console.log, console.log);
