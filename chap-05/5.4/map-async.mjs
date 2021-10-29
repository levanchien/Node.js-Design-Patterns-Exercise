export default function mapAsync(iterable = [], callback, concurrency) {
  let index = 0;
  let running = 0;
  let done = 0;
  const results = [];

  return new Promise((resolve, reject) => {
    (function doTask() {
      while (running < concurrency && done < iterable.length) {
        callback(iterable[index])
          .then(
            // Nested scope to get closure over current index (and avoid .bind).
            (() => {
              const i = index;
              return (t) => {
                console.log(i, t);
                results[i] = t;
              };
            })(),
            (e) => {
              return reject(e);
            }
          )
          .finally(() => {
            if (++done === iterable.length) {
              return resolve(results);
            }
            --running;
            doTask();
          });
        ++running;
        ++index;
      }
    })();
  });
}
