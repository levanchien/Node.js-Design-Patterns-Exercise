import { totalSales as totalSalesRaw } from "./totalSales.js";

const CACHE_TTL = 30 * 1000; // 30 seconds TTL
const cache = new Map();

export function totalSales(product, done) {
  if (cache.has(product)) {
    console.log("Cache hit");
    const value = cache.get(product);
    if (value.sum) {
      process.nextTick(() => done(null, value.sum));
    }
    return value.callbacks.push(done);
  }

  cache.set(product, {
    sum: 0,
    callbacks: [done],
  });
  totalSalesRaw(product, (err, sum) => {
    const value = cache.get(product);
    value.sum = sum;
    value.callbacks.forEach((cb) => cb(err, sum));
    value.callbacks = [];
    if (err) {
      return cache.delete(product);
    }
    setTimeout(() => {
      cache.delete(product);
    }, CACHE_TTL);
  });
}
