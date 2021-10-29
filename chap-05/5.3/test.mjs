import { TaskQueuePC } from "./TaskQueuePC.mjs";
import { TaskQueuePCPromise } from "./TaskQueuePCPromise.mjs";

const delay = (time) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(time), time));

// const queue = new TaskQueuePC(2);
const queue = new TaskQueuePCPromise(2);

for (let i = 1; i <= 10; i += 1) {
  queue
    .runTask(() => {
      return delay(2 * 1000);
    })
    .then((t) => console.log(t));
}
