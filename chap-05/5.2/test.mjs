import { TaskQueue } from "./TaskQueueAsyncAwait.mjs";

const delay = (time) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(time), time));

const queue = new TaskQueue(2);

for (let i = 1; i <= 10; i += 1) {
  queue
    .runTask(() => {
      return delay(2 * 1000);
    })
    .then((t) => console.log(t));
}
