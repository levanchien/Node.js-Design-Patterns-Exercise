import Queue from "./queue.mjs";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const queue = new Queue((enqueue) => {
  setInterval(() => {
    enqueue(getRandomInt(1000));
  }, 1000);
});

setInterval(() => {
  queue.dequeue().then((t) => {
    console.log("Received: " + t);
  });
}, 750);
