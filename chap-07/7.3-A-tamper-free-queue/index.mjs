import Queue from "./queue.mjs";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const queue = new Queue((enqueue) => {
  setInterval(() => {
    enqueue(getRandomInt(1000));
  }, 200);
});

async function test() {
  while (true) {
    await queue.dequeue().then((t) => {
      console.log("Received: " + t);
    });
  }
}

await test();

/* setInterval(() => {
  queue.dequeue().then((t) => {
    console.log("Received: " + t);
  });
}, 100); */
