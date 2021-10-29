import { delay } from "./delay.mjs";

function promiseAll(tasks) {
  const results = new Array(tasks.length);
  let done = 0;
  return new Promise((resolve, reject) => {
    tasks.forEach((task, index) => {
      task.then(
        (() => {
          const i = index;
          return (result) => {
            results[i] = result;
            if (++done === tasks.length) {
              resolve(results);
            }
          };
        })(),
        (error) => {
          reject(error);
        }
      );
    });
  });
}

const tasks = [];
for (let i = 10; i > 0; i--) {
  tasks.push(delay(i * 1000));
}

promiseAll(tasks).then(
  (t) => {
    console.log(t);
  },
  (e) => console.error
);
