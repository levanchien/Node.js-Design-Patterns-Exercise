const AsyncQueueIterator = require("./AsyncQueue");

const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(time), time));

const queue = new AsyncQueueIterator();

function addTask() {
  for (let i = 0; i < 10; i += 1) {
    queue.enqueue(() => delay((10 - i) * 200));
  }
}

async function test() {
  for await (const result of queue) {
    console.log(result);
  }
}

/* addTask();
setTimeout(() => {
  addTask();
}, 5000); */
addTask();
test();
test();
