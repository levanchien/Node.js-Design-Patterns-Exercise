import { EventEmitter } from "events";

export function ticker(milis, callback) {
  const event = new EventEmitter();
  let count = 0;

  function timeout() {
    count++;
    setTimeout(() => {
      event.emit("tick", count);
      if (count * 50 >= milis) {
        return callback(null, count);
      }
      timeout();
    }, 50);
  }

  timeout();

  return event;
}

ticker(1234, (err, count) => {
  if (err) {
    throw new Error(err);
  }

  console.log("Total tick: " + count);
})
  .on("tick", (t) => {
    console.log("tick: " + t);
  })
  .on("error", (err) => {
    console.log(err);
  });
