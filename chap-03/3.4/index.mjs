import { EventEmitter } from "events";

export function ticker(milis, callback) {
  const event = new EventEmitter();
  let count = 0;

  function timeout() {
    if (Date.now() % 5 === 0) {
      process.nextTick(() =>
        event.emit("error", new Error("Divisible by 5 !"))
      );
      return callback("Divisible by 5 !");
    }
    count++;
    process.nextTick(() => event.emit("tick", count));
    setTimeout(() => {
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
