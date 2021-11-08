import { totalSales as totalSalesRaw } from "./totalSales.js";

const runningRequests = new Map();

export function totalSales(product, done) {
  if (runningRequests.has(product)) {
    console.log("Batching");
    const queue = runningRequests.get(product);
    queue.push(done);
    return;
  }

  runningRequests.set(product, [done]);
  totalSalesRaw(product, (err, sum) => {
    const queue = runningRequests.get(product);
    queue.forEach((cb) => cb(err, sum));
    runningRequests.delete(product);
  });
}
